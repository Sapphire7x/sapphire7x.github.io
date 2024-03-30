"""
with open("realLatin.txt", "r") as f:
    lines = f.readlines()
with open("realLatin.txt", "w") as f:
    for line in lines:
        if line.strip(" \n"):
            f.write(line)

import fileinput
#lines_seen = set();
with fileinput.FileInput('realLatin.txt', inplace=True, backup='.bak') as file:
    for line in file:
        print(line.replace("^", ""), end='')
"""
lines_seen = set() # holds lines already seen
outfile = open("latin.txt", "w")
for line in open("realLatin.txt", "r"):
    if line not in lines_seen: # not a duplicate
        outfile.write(line)
        lines_seen.add(line)
outfile.close()