## usage - python3 day6.py < input6.txt

input = [x.strip() for x in list(open(0))]
times = list(map(int, input[0].split(':')[1].split()))
distances = list(map(int, input[1].split(':')[1].split()))

def countWaysToBeat(time, distanceToBeat):
    ways = 0
    for hold in range(time):
        timeRemaining = time - hold
        distance = hold * timeRemaining
        if distance > distanceToBeat:
            ways += 1
    return ways

def part1():
    res = 1
    for i in range(len(times)):
        res *= countWaysToBeat(times[i], distances[i])
    print(res)

def part2():
    time = int(''.join([str(x) for x in times]))
    distanceToBeat = int(''.join([str(x) for x in distances]))
    print(countWaysToBeat(time, distanceToBeat))

part1()
part2()