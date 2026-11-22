import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('167.86.106.149', port=22022, username='root', password='7ARyv1nDKTBnOF4f', timeout=15)
stdin, stdout, stderr = client.exec_command('find / -name "*nano-growth*" 2>/dev/null; find / -name "*globalpharma*" 2>/dev/null')
print(stdout.read().decode('utf-8'))
client.close()
