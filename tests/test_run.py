import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

import run


class EnsureNpmPackagesTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.project_dir = Path(self.temp_dir.name)
        (self.project_dir / "package.json").write_text('{"dependencies": {}}\n')
        (self.project_dir / "package-lock.json").write_text('{"lockfileVersion": 3}\n')

    def tearDown(self) -> None:
        self.temp_dir.cleanup()

    @patch("run.subprocess.run")
    def test_installs_when_node_modules_is_missing(self, run_command) -> None:
        run_command.return_value = subprocess.CompletedProcess([], 0)

        run.ensure_npm_packages(self.project_dir, "npm", "teste")

        run_command.assert_called_once_with(
            ["npm", "install", "--no-audit", "--no-fund"],
            cwd=self.project_dir,
            check=False,
        )
        self.assertEqual(
            (self.project_dir / run.INSTALL_MARKER).read_text().strip(),
            run.dependency_hash(self.project_dir),
        )

    @patch("run.subprocess.run")
    def test_skips_install_when_dependencies_are_current(self, run_command) -> None:
        (self.project_dir / "node_modules").mkdir()
        (self.project_dir / run.INSTALL_MARKER).write_text(
            f"{run.dependency_hash(self.project_dir)}\n"
        )
        run_command.return_value = subprocess.CompletedProcess([], 0)

        run.ensure_npm_packages(self.project_dir, "npm", "teste")

        run_command.assert_called_once_with(
            ["npm", "ls", "--depth=0"],
            cwd=self.project_dir,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )

    @patch("run.subprocess.run")
    def test_reinstalls_when_manifest_changes(self, run_command) -> None:
        (self.project_dir / "node_modules").mkdir()
        (self.project_dir / run.INSTALL_MARKER).write_text("hash-antigo\n")
        run_command.return_value = subprocess.CompletedProcess([], 0)

        run.ensure_npm_packages(self.project_dir, "npm", "teste")

        self.assertEqual(run_command.call_args.args[0][1], "install")

    @patch("run.subprocess.run")
    def test_does_not_save_marker_when_install_fails(self, run_command) -> None:
        run_command.return_value = subprocess.CompletedProcess([], 1)

        with self.assertRaises(RuntimeError):
            run.ensure_npm_packages(self.project_dir, "npm", "teste")

        self.assertFalse((self.project_dir / run.INSTALL_MARKER).exists())


class WaitProcessesTests(unittest.TestCase):
    def test_returns_the_finished_process_exit_code(self) -> None:
        running_process = Mock()
        running_process.poll.return_value = None
        failed_process = Mock()
        failed_process.poll.return_value = 2

        exit_code = run.wait_processes(
            [
                ("backend", running_process),
                ("frontend", failed_process),
            ]
        )

        self.assertEqual(exit_code, 2)


if __name__ == "__main__":
    unittest.main()
