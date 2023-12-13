# usage - python3 day5.py < input5.txt

input = list(open(0))
input = [x.strip() for x in input]

def getSeats():
    res = []
    for seat in input:
        first = seat[0:7]
        second = seat[7:]
        row = 0
        col = 0
        for i in range(7):
            if first[i] == 'B':
                row += 2 ** (6-i)
        for i in range(3):
            if second[i] == 'R':
                col += 2 ** (2 - i)
        res.append(row*8+col) 
    res.sort()
    return res

seats = getSeats()

def part1():
    print(seats[-1])

def part2():
    for i, seat in enumerate(seats):
        if seat - seats[i-1] == 2:
            print(seat - 1)
part1()
part2()