import fileinput

with fileinput.FileInput('realLatin.txt', inplace=True, backup='.bak') as file:
    for line in file:
        print(line.replace("S", ""), end='')