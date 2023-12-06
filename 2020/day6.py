# usage - python3 day6.py < input6.txt
from collections import defaultdict

input = [x.strip() for x in list(open(0))]

def part1():
    data = ' '.join(input).split('  ')
    data = [x.replace(' ', '') for x in data]
    sum = 0
    for group in data:
        yes = set([])
        for char in group:
            yes.add(char)
        sum += len(yes)
    print(sum)

def part2():
    res = 0
    data = ' '.join(input).split('  ')
    data = [x.split(' ') for x in data]

    for group in data:
        counts = defaultdict(int) 
        for person in group:
            ans = set()
            for q in person:
                ans.add(q)
            for a in ans:
                counts[a] += 1
        for c in counts.values():
            if c == len(group):
                res += 1
    print(res)

part1()
part2()