import argparse
import hashlib
import os
import platform
import shutil
import signal
import subprocess
import sys
import time
from pathlib import Path

IS_WINDOWS = platform.system().lower() == "windows"
DEPENDENCY_FILES = ("package.json", "package-lock.json")
INSTALL_MARKER = ".installed_hash"


def resolve_npm_executable() -> str:
    npm_path = shutil.which("npm") or shutil.which("npm.cmd")
    if not npm_path:
        raise FileNotFoundError(
            "npm nao encontrado no PATH. Instale Node.js 18+ e reinicie o terminal."
        )
    return npm_path


def dependency_hash(project_dir: Path) -> str:
    digest = hashlib.sha256()

    for filename in DEPENDENCY_FILES:
        dependency_file = project_dir / filename
        if dependency_file.exists():
            digest.update(filename.encode())
            digest.update(dependency_file.read_bytes())

    return digest.hexdigest()


def dependencies_are_valid(project_dir: Path, npm_exec: str) -> bool:
    result = subprocess.run(
        [npm_exec, "ls", "--depth=0"],
        cwd=project_dir,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return result.returncode == 0


def ensure_npm_packages(
    project_dir: Path,
    npm_exec: str,
    name: str,
    force_install: bool = False,
) -> None:
    package_json = project_dir / "package.json"
    node_modules = project_dir / "node_modules"
    marker = project_dir / INSTALL_MARKER

    if not package_json.exists():
        raise FileNotFoundError(f"package.json nao encontrado em {project_dir}")

    current_hash = dependency_hash(project_dir)
    saved_hash = marker.read_text().strip() if marker.exists() else None

    install_reason = None
    if force_install:
        install_reason = "atualizacao forcada"
    elif not node_modules.exists():
        install_reason = "node_modules ausente"
    elif saved_hash != current_hash:
        install_reason = "package.json ou package-lock.json foi alterado"
    elif not dependencies_are_valid(project_dir, npm_exec):
        install_reason = "dependencias ausentes ou inconsistentes"

    if install_reason is None:
        print(f"✔ Dependencias do {name} ja estao instaladas.")
        return

    print(
        f"Instalando dependencias do {name} ({install_reason})...",
        flush=True,
    )
    result = subprocess.run(
        [npm_exec, "install", "--no-audit", "--no-fund"],
        cwd=project_dir,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"Falha ao instalar dependencias do {name}.")

    marker.write_text(f"{dependency_hash(project_dir)}\n")
    print(f"✔ Dependencias do {name} atualizadas.")


def start_process(cmd: list[str], cwd: Path) -> subprocess.Popen:
    kwargs = {}
    if IS_WINDOWS:
        kwargs["creationflags"] = subprocess.CREATE_NEW_PROCESS_GROUP
    else:
        kwargs["start_new_session"] = True

    return subprocess.Popen(
        cmd,
        cwd=cwd,
        stdin=subprocess.DEVNULL,
        **kwargs,
    )


def stop_process(proc: subprocess.Popen, timeout: float = 5) -> None:
    if proc.poll() is not None:
        return

    try:
        if IS_WINDOWS:
            subprocess.run(
                ["taskkill", "/F", "/T", "/PID", str(proc.pid)],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=False,
            )
        else:
            os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
            try:
                proc.wait(timeout=timeout)
            except subprocess.TimeoutExpired:
                os.killpg(os.getpgid(proc.pid), signal.SIGKILL)
                proc.wait()
    except (OSError, ProcessLookupError):
        return


def wait_processes(processes: list[tuple[str, subprocess.Popen]]) -> int:
    try:
        while True:
            for name, proc in processes:
                return_code = proc.poll()
                if return_code is not None:
                    print(f"\n{name} finalizado (codigo {return_code}). Encerrando...")
                    return return_code
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\nInterrupcao do usuario. Encerrando...")
        return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Prepara e inicia o backend e o frontend do NAVIR."
    )
    parser.add_argument(
        "--force-install",
        action="store_true",
        help="executa npm install no backend e no frontend mesmo sem mudancas",
    )
    parser.add_argument(
        "--install-only",
        action="store_true",
        help="instala ou atualiza as dependencias sem iniciar os servicos",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = Path(__file__).resolve().parent
    backend_dir = root / "src" / "backend"
    frontend_dir = root / "src" / "frontend"

    if not backend_dir.exists() or not frontend_dir.exists():
        raise FileNotFoundError(
            "Pastas src/backend ou src/frontend nao encontradas no diretorio atual."
        )

    npm_exec = resolve_npm_executable()

    print("---------------- Preparando ambiente ----------------", flush=True)
    ensure_npm_packages(
        backend_dir,
        npm_exec,
        "backend",
        force_install=args.force_install,
    )
    ensure_npm_packages(
        frontend_dir,
        npm_exec,
        "frontend",
        force_install=args.force_install,
    )

    if args.install_only:
        print("\nDependencias verificadas. Nenhum servico foi iniciado.")
        return 0

    backend_cmd = [npm_exec, "run", "start:dev"]
    frontend_cmd = [npm_exec, "run", "dev"]
    processes: list[tuple[str, subprocess.Popen]] = []

    try:
        print("\nIniciando backend...")
        processes.append(("backend", start_process(backend_cmd, backend_dir)))

        print("Iniciando frontend...")
        processes.append(("frontend", start_process(frontend_cmd, frontend_dir)))

        print("\n---------------- Projeto rodando ----------------")
        print("Backend:  http://localhost:3000")
        print("Frontend: http://localhost:5173")
        print("-------------------------------------------------\n")

        return wait_processes(processes)
    finally:
        for _, process in reversed(processes):
            stop_process(process)


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (FileNotFoundError, RuntimeError) as error:
        print(f"\nErro: {error}", file=sys.stderr)
        sys.exit(1)
