import subprocess
import tempfile
import os

def execute_code(code: str) -> str:
    """
    Execute Python code safely using a temporary file.
    In production, ensure proper sandboxing.
    """
    with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as tmp:
        tmp.write(code)
        tmp_filename = tmp.name
    try:
        result = subprocess.run(
            ["python", tmp_filename],
            capture_output=True,
            text=True,
            timeout=5
        )
        output = result.stdout if result.stdout else result.stderr
    except subprocess.TimeoutExpired:
        output = "Execution timed out."
    finally:
        os.remove(tmp_filename)
    return output
