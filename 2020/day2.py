# usage - python3 day2.py < input2.txt
input = list(open(0)) 

def getParts(line):
    data = line.split()
    min, max = [int(x) for x in data[0].split("-")]
    letter = data[1][0]
    password = data[2]
    return min, max, letter, password

def part1():
    res = 0
    for line in input:
        min, max, letter, password = getParts(line)
        count = password.count(letter)
        if count >= min and count <= max:
            res += 1
    print(res)


def part2():
    res = 0
    for line in input:
        pos1, pos2, letter, password = getParts(line)
        if (password[pos1 - 1] == letter or password[pos2 - 1] == letter) and password[pos1 - 1] != password[pos2 - 1]:
            res += 1
    print(res)

part1()
part2()