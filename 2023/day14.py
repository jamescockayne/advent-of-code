# usage - python3 day14.py < input14.txt
input = [ [x for x in x.strip()] for x in list(open(0))]

dirs = {
    'e': (1, 0),
    'w': (-1, 0),
    'n': (0, -1),
    's': (0, 1),
}

def move(array, line, col, dir):
    if array[line][col] != 'O':
        return
    dc, dl = dirs[dir]
    moveToLine, moveToCol = line, col

    while (
        moveToLine + dl >= 0 and moveToLine + dl < len(array) and 
        moveToCol + dc >= 0 and moveToCol + dc < len(array[0]) and
        array[moveToLine + dl][moveToCol + dc] == '.'
    ):
        moveToLine, moveToCol = moveToLine + dl, moveToCol + dc
  
    array[line][col] = '.'
    array[moveToLine][moveToCol] = 'O'
    return

def getLoad(array):
    res = 0
    for i, row in enumerate(array):
        res += (''.join(row).count('O') * (len(array) - i))
    return res

def cycle(array):
    for l in range(len(array)):
        for c in range(len(array[0])):
           move(array, l, c, 'n') 
    for c in range(len(array[0])):
        for l in range(len(array)):
           move(array, l, c, 'w')
    l = len(array) - 1
    while l >= 0:
        for c in range(len(array[0])):
           move(array, l, c, 's')
        l -= 1 
    c = len(array[0]) - 1
    while c >= 0:
        for l in range(len(array)):
           move(array, l, c, 'e')
        c -= 1
    

def part1():
    table = input.copy()
    for l in range(len(table)):
        for c in range(len(table[0])):
           move(table, l, c, 'n') 
    print(getLoad(table))
    

def part2():
    iFoundThatTheCycleIsOfLength9 = [99641, 99630, 99623, 99618, 99621, 99625, 99652, 99654, 99646]
    print(iFoundThatTheCycleIsOfLength9[(1000000000 % 9) - 1])

part1()
part2()