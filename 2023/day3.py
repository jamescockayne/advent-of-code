# usage - python3 day3.py < input3.txt

input = list(open(0))

def part1():
    visited = set([])
    def checkNeighbors(l, nums, nume):
        ls, le = max(l-1, 0), min(len(input), l+2)
        nums, nume = max(nums-1, 0), min(nume+2, len(input[0]) - 1)
        for i in range(ls, le):
            for j in range(nums, nume):
                if input[i][j] != '.' and not input[i][j].isdigit():
                    return True
        return False

    def extractNumber(l, c):
        i, num = 0, ''
        while (input[l][c + i].isdigit()):
            visited.add((l, c + i))
            num += input[l][c + i]
            i += 1
        return int(num), c, c + i -1

    sum = 0
    for l in range(len(input)):
        for c in range(len(input[1])-1):
            curr = input[l][c]
            if curr.isdigit() and (l, c) not in visited:
                num, started, ended = extractNumber(l, c)
                shouldCount = checkNeighbors(l, started, ended)
                if shouldCount:
                    sum += num
    print(sum)

def part2():
    def findNumsAroundStar(l, c):
        v = set([])
        nums = []
        for i in range(l-1, l+2):
            for j in range(c-1, c+2):
                if (i, j) not in v and input[i][j].isdigit():
                    nums.append(extractNumber(i, j, v))
        return nums

    def extractNumber(l, c, v):
        while input[l][c-1].isdigit():
            c -= 1
        num = ''
        while input[l][c].isdigit():
            v.add((l, c))    
            num += input[l][c]
            c += 1
        return int(num)

    sum = 0
    for l in range(len(input)):
        for c in range(len(input[1])-1):
            curr = input[l][c]
            if curr != '*':
                continue
            foundNumbers = findNumsAroundStar(l, c)
            if len(foundNumbers) == 2:
                sum += foundNumbers[0] * foundNumbers[1]
            
    print(sum)

part1()
part2()
