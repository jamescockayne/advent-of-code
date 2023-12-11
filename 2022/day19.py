# usage - python3 day19.py < day19.txt

from functools import cache

input = [x.strip() for x in list(open(0))]

def getCostsFromLine(line):
    number, rest = line.split(':')
    number = int(number.split()[1])
    costs = [x.strip().split() for x in rest.split('.')]
    return int(costs[0][4]), int(costs[1][4]), int(costs[2][4]), int(costs[2][7]), int(costs[3][4]), int(costs[3][7])

@cache
def getMaxGeodes(oreAmount, clayAmount, obsidianAmount, geodeAmount, oreRobots, clayRobots, obsidianRobots, geodeRobots, time, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian):
    if time == 0:
        return geodeAmount
    else: 
        canBuildOreRobot = oreAmount >= oreCost
        canBuildClayRobot = oreAmount >= clayCost
        canBuildObsidianRobot = clayAmount >= obsidianCostClay and oreAmount >= obsidianCostOre
        canBuildGeodeRobot = obsidianAmount >= geodeCostObsidian and oreAmount >= geodeCostOre

        oreAmount += oreRobots
        clayAmount += clayRobots
        obsidianAmount += obsidianRobots
        geodeAmount += geodeRobots

        if not canBuildOreRobot and not canBuildClayRobot and not canBuildObsidianRobot and not canBuildGeodeRobot:
            return getMaxGeodes(oreAmount, clayAmount, obsidianAmount, geodeAmount, oreRobots, clayRobots, obsidianRobots, geodeRobots, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian)
        if canBuildGeodeRobot:
            return getMaxGeodes(oreAmount - geodeCostOre, clayAmount, obsidianAmount - geodeCostObsidian, geodeAmount, oreRobots, clayRobots, obsidianRobots, geodeRobots + 1, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian)
        if canBuildObsidianRobot:
            return getMaxGeodes(oreAmount - obsidianCostOre, clayAmount - obsidianCostClay, obsidianAmount, geodeAmount, oreRobots, clayRobots, obsidianRobots + 1, geodeRobots, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian)
        else:
            mostExpensiveRobotOreCost = max(oreCost, clayCost, obsidianCostOre, geodeCostOre)
            if oreRobots > mostExpensiveRobotOreCost:
               return max(
                    getMaxGeodes(oreAmount - clayCost, clayAmount, obsidianAmount, geodeAmount, oreRobots, clayRobots + 1, obsidianRobots, geodeRobots, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian) if canBuildClayRobot else 0,
                    getMaxGeodes(oreAmount - obsidianCostOre, clayAmount - obsidianCostClay, obsidianAmount, geodeAmount, oreRobots, clayRobots, obsidianRobots + 1, geodeRobots, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian) if canBuildObsidianRobot else 0,
                    getMaxGeodes(oreAmount, clayAmount, obsidianAmount, geodeAmount, oreRobots, clayRobots, obsidianRobots, geodeRobots, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian))
            else: 
                return max(
                getMaxGeodes(oreAmount - oreCost, clayAmount, obsidianAmount, geodeAmount, oreRobots + 1, clayRobots, obsidianRobots, geodeRobots, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian ) if canBuildOreRobot else 0,
                getMaxGeodes(oreAmount - clayCost, clayAmount, obsidianAmount, geodeAmount, oreRobots, clayRobots + 1, obsidianRobots, geodeRobots, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian) if canBuildClayRobot else 0,
                getMaxGeodes(oreAmount - obsidianCostOre, clayAmount - obsidianCostClay, obsidianAmount, geodeAmount, oreRobots, clayRobots, obsidianRobots + 1, geodeRobots, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian) if canBuildObsidianRobot else 0,
                getMaxGeodes(oreAmount, clayAmount, obsidianAmount, geodeAmount, oreRobots, clayRobots, obsidianRobots, geodeRobots, time - 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian))

def part1():
    res = 0
    for i, blueprint in enumerate(input):
        num = getMaxGeodes(0, 0, 0, 0, 1, 0, 0, 0, 24, *getCostsFromLine(blueprint))
        res += num * (i + 1)
    print(res)

def part2():
    res = 1
    for i in range(3):
        num = getMaxGeodes(0, 0, 0, 0, 1, 0, 0, 0, 32, *getCostsFromLine(input[i]))
        res *= num
    print(res) 

part1()
part2()