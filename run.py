import os
import platform
import shutil
import signal
import subprocess
import sys
import time
from pathlib import Path

IS_WINDOWS = platform.system().lower() == "windows"


def resolve_npm_executable() -> str:
    npm_path = shutil.which("npm") or shutil.which("npm.cmd")
    if not npm_path:
        raise FileNotFoundError(
            "npm nao encontrado no PATH. Instale Node.js 18+ e reinicie o terminal."
        )
    return npm_path


def ensure_npm_packages(project_dir: Path, npm_exec: str, name: str) -> None:
    package_json = project_dir / "package.json"
    node_modules = project_dir / "node_modules"

    if not package_json.exists():
        raise FileNotFoundError(f"package.json nao encontrado em {project_dir}")

    if node_modules.exists():
        print(f"✔ Dependencias do {name} ja estao instaladas.")
        return

    print(f"Instalando dependencias do {name}...")
    if subprocess.call([npm_exec, "install"], cwd=project_dir) != 0:
        raise RuntimeError(f"Falha ao instalar dependencias do {name}.")


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


def kill_recursive(proc: subprocess.Popen) -> None:
    if proc.poll() is not None:
        return

    try:
        if IS_WINDOWS:
            subprocess.run(
                f"taskkill /F /T /PID {proc.pid}",
                shell=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
        else:
            os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
    except Exception:
        pass


def wait_processes(processes: list[tuple[str, subprocess.Popen]]) -> None:
    try:
        while True:
            for name, proc in processes:
                return_code = proc.poll()
                if return_code is not None:
                    print(f"\n{name} finalizado (codigo {return_code}). Encerrando...")
                    return
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\nInterrupcao do usuario. Encerrando...")


def main() -> None:
    root = Path(__file__).resolve().parent
    backend_dir = root / "src" / "backend"
    frontend_dir = root / "src" / "frontend"

    if not backend_dir.exists() or not frontend_dir.exists():
        raise FileNotFoundError(
            "Pastas src/backend ou src/frontend nao encontradas no diretorio atual."
        )

    npm_exec = resolve_npm_executable()

    print("---------------- Preparando ambiente ----------------")
    ensure_npm_packages(backend_dir, npm_exec, "backend")
    ensure_npm_packages(frontend_dir, npm_exec, "frontend")

    backend_cmd = [npm_exec, "run", "start:dev"]
    frontend_cmd = [npm_exec, "run", "dev"]

    print("\nIniciando backend...")
    backend_proc = start_process(backend_cmd, backend_dir)

    print("Iniciando frontend...")
    frontend_proc = start_process(frontend_cmd, frontend_dir)

    print("\n---------------- Projeto rodando ----------------")
    print("Backend:  http://localhost:3000")
    print("Frontend: http://localhost:5173")
    print("-------------------------------------------------\n")

    try:
        wait_processes([
            ("backend", backend_proc),
            ("frontend", frontend_proc),
        ])
    finally:
        kill_recursive(backend_proc)
        kill_recursive(frontend_proc)


if __name__ == "__main__":
    main()
