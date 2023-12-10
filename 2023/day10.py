# usage - python3 day10.py < input10.txt
from collections import deque

input = [[x.strip() for x in x.strip()] for x in list(open(0))]
dirs = {'n': (0, -1), 'e': (1, 0), 's': (0, 1), 'w': (-1, 0)}

def getConnectedDirs(pipe):
    if pipe == '|':
        return [dirs['n'], dirs['s']]
    if pipe == '-':
        return [dirs['e'], dirs['w']]
    if pipe == 'L':
        return [dirs['n'], dirs['e']] 
    if pipe == 'J':
        return [dirs['n'], dirs['w']]
    if pipe == '7':
        return [dirs['s'], dirs['w']]
    if pipe == 'F':
        return [dirs['s'], dirs['e']]
    if pipe == '.':
        return []

def getStart():
    for i in range(len(input)):
        for j in range(len(input[0])):
            if input[i][j] == 'S':
                input[i][j] = '|'
                return (i, j)

def solve():
    visited = {}
    y, x = getStart()
    visited[(y,x)] = 0

    def bfs(pos): # a bfs ensures that both 'branches' of exploration will hit the middle at the same time 
        q = deque([pos])
        while q:
            y, x = q.popleft()
            pipeAtPos = input[y][x]
            pipeDistanceFromStart = visited[(y,x)]
            for dx, dy in getConnectedDirs(pipeAtPos):
                checkingPos = (y+dy, x+dx)
                if checkingPos not in visited.keys():
                    visited[checkingPos] = pipeDistanceFromStart + 1
                    q.append(checkingPos)
    
    # Part 1
    bfs((y,x))
    print('Part 1: ', max(visited.values()))

    # Part 2
    count = 0
    for y in range(len(input)):
        for x in range(len(input[y])):
            if (y, x) in visited:
                continue 
            crosses = 0
            i = x
            while i < len(input[y]): # scan line left to right and count each time the cursor crosses the border of the pipe
                if (y, i) in visited:
                    if input[y][i] == '|':
                        crosses += 1
                    if input[y][i] in ['7', 'L', 'F', 'J']:
                        first = input[y][i]
                        i += 1
                        while input[y][i] == '-':
                            i += 1
                        if (first == 'F' and input[y][i] == 'J') or (first =='L' and input[y][i] == '7'):
                            crosses += 1
                i += 1
            if crosses % 2 == 1: # if the number of pipe boarder crosses was odd, then the original position must have been inside the polygon formed by the pipe border
                count += 1
    print('Part 2: ', count)

solve()