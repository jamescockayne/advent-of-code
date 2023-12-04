# usage - python3 day4.py < input4.txt

from collections import deque
input = list(open(0))

def getParts(line):
    data = line.split(':')[1].split('|')
    winning, have = [list(map(int, j)) for j in [x.strip().split() for x in data]]
    winmap = {}
    for w in winning:
        winmap[w] = True 
    return winmap, have

def part1():
    res = 0
    for line in input:
        score = 0
        winmap, have = getParts(line)
        for h in have:
            if h in winmap:
                score = max(1, score * 2)
        res += score

    print(res)


def part2():
    card_to_score = {}
    res = 0
    q = deque()
    
    for i, line in enumerate(input):
        card_num, score = i + 1, 0
        winmap, have = getParts(line)
        for h in have:
            if h in winmap:
                score += 1
        card_to_score[card_num] = score
        q.append(card_num)

    while q:
        current_card = q.popleft()
        res += 1
        for i in range(1, card_to_score[current_card] + 1):
            q.append(current_card+i)

    print(res)

part1()
part2()
