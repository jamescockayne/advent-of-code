# usage - python3 day4.py < input4.txt
input = list(open(0))
input = ' '.join(input).split(' \n ')
input = [x.replace('\n', '') for x in input]

def part1():
    res = 0
    for line in input:
        need = {'byr': False, 'iyr':False, 'eyr':False, 'hgt':False, 'hcl':False, 'ecl':False, 'pid':False}
        kvs = line.split(' ')
        for kv in kvs:
            k, v = kv.split(':')
            need[k] = True
        if sum([int(x) for x in need.values()]) == len(need.keys()):
            res += 1
    print(res)


def isValidHeight(value):
    if value.endswith('cm'):
        number = int(value.removesuffix('cm'))
        if number >= 150 and number <= 193:
            return True
    
    if value.endswith('in'):
        number = int(value.removesuffix('in'))
        if number >= 59 and number <= 76:
            return True

    return False

def isValidEye(value):
    return value in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

def isValidHair(value = ''):
    if value[0] != '#':
        return False
    if len(value) != 7:
        return False
    for i in range(1, 7):
        if value[i] not in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']:
            return False
    return True

def isValidYear(value, min, max):
    if len(value) != 4 or int(value) < min or int(value) > max:
        return False
    return True

def isValidPn(value):
    return len([x for x in value if x.isdigit()]) == 9

def part2():
    res = 0
    for line in input:
        need = {'byr': False, 'iyr':False, 'eyr':False, 'hgt':False, 'hcl':False, 'ecl':False, 'pid':False}
        kvs = line.split(' ')
        for kv in kvs:
            k, v = kv.split(':')
            need[k] = v

        missing = [x for x in need.values() if x == False]
        if (
            len(missing) > 0
            or not isValidYear(need['byr'], 1920, 2002)
            or not isValidYear(need['iyr'], 2010, 2020) 
            or not isValidYear(need['eyr'], 2020, 2030)
            or not isValidHeight(need['hgt'])
            or not isValidEye(need['ecl'])
            or not isValidHair(need['hcl'])
            or not isValidPn(need['pid']) 
            ):
            continue;
        res += 1
    print(res)

part1()
part2()