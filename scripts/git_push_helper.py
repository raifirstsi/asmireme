import subprocess

def run(cmd):
    print("Running:", cmd)
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(res.stdout)
    if res.stderr:
        print("STDERR:", res.stderr)
    if res.returncode != 0:
        raise Exception(f"Command failed with exit code {res.returncode}")

run("git add -A")
run('git commit -m "feat(telegram): support parallel notifications to 1-1 admin chat and RAI2 POWER group, add outbound click alerts"')
run("git push origin master")
run("git push origin master:main")
