# Models
1. Plain A* over moves (baseline): 200,000.
2. A* over pushes, Manhattan: weak bound.
3. + dead cells via pull-BFS.
4. + canonical player (min cell).
5. + assignment heuristic (bijection).
6. Room decomposition (hallway+rooms).
7. Room A* + hallway walk stitch.
8. IDA* over pushes: 19.7s, 0 pts. No.
9. BFS over pushes: too slow. No.
10. Room BFS: slow on 4 boxes. No.
11. COMBINED BEST = 6+7+3+4+5, heap A*: 1,000,000, ~0.6s/set.
12. Nearest-goal heuristic: weaker. No.
13. Linear-scan open list: slower. No.
14. Bucket open list: diff tie-break. No.
15. Whole-level A*: explodes. No.
