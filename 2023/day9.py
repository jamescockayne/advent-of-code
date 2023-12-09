# usage - python3 day9.py < day9.txt

input = [[int (x) for x in x.strip().split()] for x in list(open(0))]

def solve(input):
    res = 0
    for seq in input:
        level, i = {0: seq}, 0
        while not all([x == 0 for x in level[i]]):
            prevLevel, newLevel = level[i], []
            i += 1;
            for j in range(1,len(prevLevel)):
                newLevel.append(prevLevel[j] - prevLevel[j-1])
            level[i] = newLevel

        bottomLevel = max(level.keys())
        level[bottomLevel].append(0)
        i  = bottomLevel - 1
        while i >= 0:
            level[i].append(level[i+1][-1] + level[i][-1])
            i -= 1
        res += level[0][-1]
    print(res) 

solve(input)
solve([list(reversed(x)) for x in input])