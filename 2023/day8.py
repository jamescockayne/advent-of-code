# usage python day8.py < day8.txt
from math import lcm

input = [x.strip() for x in list(open(0))]
lr, map, dir = input[0], input[2:], {}

for line in map:
    line = line.split('=')
    key = line[0].strip()
    left, right = [x.strip() for x in line[1].replace('(', '').replace(')', '').split(',')]
    dir[key] = (left, right)

def part1():
    curr, res = 'AAA', 0
    while curr != 'ZZZ':
        direction = lr[res%len(lr)]
        curr = dir[curr][0 if direction == 'L' else 1]
        res += 1
    print(res)

def part2():
    startNodes = [x for x in dir.keys() if x[2] == 'A']
    cycleLengths = []
    for c in startNodes:
        curr, res = c, 0
        while curr[2] != 'Z':
            direction = lr[res%len(lr)]
            curr = dir[curr][0 if direction == 'L' else 1]
            res += 1
        cycleLengths.append(res)
    
    print(lcm(*cycleLengths))

part1()
part2()