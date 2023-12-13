# usage: python3 day3.py < input3.txt
input = [x.strip() for x in list(open(0))]

def getCharAtPlace(line, i):
    return input[line][i % len(input[0])]

def part1():
    res = 0
    curr = (0, 0)
    while curr[1] < len(input):
        char = getCharAtPlace(curr[1], curr[0])
        if char == '#':
            res += 1
        curr = (curr[0] + 3, curr[1] + 1)

    print(res)

def part2():
    res = 1 
    slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]]
    for right, down in slopes:
        trees = 0
        curr = (0, 0)
        while curr[1] < len(input):
            char = getCharAtPlace(curr[1], curr[0])
            if char == '#':
                trees += 1
            new_pos = (curr[0] + right, curr[1] + down)
            curr = new_pos
        res *= trees 

    print(res)

part1()
part2()
