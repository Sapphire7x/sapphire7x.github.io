"""
import fileinput
lines_seen = set();
with fileinput.FileInput('realLatin.txt', inplace=True, backup='.bak') as file:
    for line in file:
        if line in lines_seen:
            line = ""
            try:
                line.strip("\n")
            except:
                #print('')
                # do nothing if fail ig
        else:
            lines_seen.add(line)
            #print(line.replace("S", ""), end='')
"""
lines_seen = set() # holds lines already seen
outfile = open("latin.txt", "w")
for line in open("realLatin.txt", "r"):
    if line not in lines_seen: # not a duplicate
        outfile.write(line)
        lines_seen.add(line)
outfile.close()