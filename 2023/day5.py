# usage - python3 day5.py < input5.txt
# TODO - come back to this one. My approach to part two was to do a reverse mapping, starting at location 0.
# this takes about ~10 minutes on my macbook so there's probably a much quicker way i'm missing.

input = [x.strip() for x in list(open(0))]
seeds = [int(x) for x in input[0].strip().split(':')[1].strip().split()]
input = input[1:]
groups = ' '.join(input).split('  ')
maps = {}
for g in groups:
    name, values = g.strip().split(':')
    maps[name.split(' ')[0]] = [int(x) for x in values.strip().split()]

def expandMap(array):
        bigMap = []
        i = 0
        while i < len(array):
            des = array[i+0]
            sou = array[i+1]
            lon = array[i+2]
            i += 3
            bigMap.append([des, sou, lon])
    
        return bigMap 

fullmaps = {k: expandMap(v) for k,v in maps.items()}
    

def part1():
    res = 0

    def getInMap(map, num):
        map = fullmaps[map]
        for des, sou, lon in map:
            low = sou
            high = sou + lon
            if num in range(low, high):
                offset = num - sou
                return des + offset
        return num

    for seed in seeds:
        soil = getInMap('seed-to-soil', seed)
        fer = getInMap('soil-to-fertilizer', soil)
        wat = getInMap('fertilizer-to-water', fer)
        lit = getInMap('water-to-light', wat)
        temp = getInMap('light-to-temperature', lit)
        hum = getInMap('temperature-to-humidity', temp)
        loc = getInMap('humidity-to-location', hum)
        if res == 0:
            res = loc
        else:
            res = min(res, loc)

    print(res)


def part2():
    res = 0

    def doesSeedExist(seed):
        j = 0
        while j < len(seeds):
            start, end = seeds[j], seeds[j] + seeds[j+1]
            if seed >= start and seed < end:
                return True
            j += 2
        return False

    def getInMapReverse(map, num):
        map = fullmaps[map]
        for des, sou, lon in map:
            low = des
            high = des + lon
            if num >= low and num < high:
                offset = num - des
                return sou + offset
        return num

    def getSeedForLoc(loc):
        hum = getInMapReverse('humidity-to-location', loc)
        temp = getInMapReverse('temperature-to-humidity', hum)
        lit = getInMapReverse('light-to-temperature', temp)
        wat = getInMapReverse('water-to-light', lit)
        fer = getInMapReverse('fertilizer-to-water', wat)
        soil = getInMapReverse('soil-to-fertilizer', fer)
        seed = getInMapReverse('seed-to-soil', soil)
        return seed
    
    while True:
        possibleSeed = getSeedForLoc(res)
        if doesSeedExist(possibleSeed):
            print(res)
            break
        if res % 1000000 == 0:
            print('checked ', res//1000000, ' million so far, still working...')
        res += 1

part1()
part2()