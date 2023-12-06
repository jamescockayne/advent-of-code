from functools import cache

input = [x.strip() for x in list(open(0))]
map = {}
for line in input:
    k = line.split('bags contain')[0].strip()
    v = {}
    for data in line.split('bags contain')[1].strip().split(','):
        if data == 'no other bags.':
            continue
        name = ' '.join(data.split()[1:3])
        number = data.split()[0]
        v[name] = int(number)
    map[k] = v

@cache
def contains(bag, target):
    for b in map[bag].keys():
        if b == target:
            return True 
        if contains(b, target):
            return True
    return False

@cache
def countBagsInBag(bag):
    if len(map[bag].keys()) == 0:
        return 0
    return sum(map[bag].values()) + sum([n * countBagsInBag(b) for b, n in map[bag].items()])

def part1():
    count = 0
    colors = map.keys()
    for c in colors:
        if contains(c, 'shiny gold'):
            count += 1
    print(count)

def part2():
    print(countBagsInBag('shiny gold'))
    

part1()
part2()