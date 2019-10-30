'use strict';

export let nodes = [
    {"id": "3", cut: 1},
    {"id": "18", cut: 1},
    {"id": "24", cut: 1},
    {"id": "38", cut: 1},
    {"id": "bcc1", color: 1},  // 39 46
    {"id": "bcc2", color: 2},  // 28 38
    {"id": "bcc3", color: 3},  // 42 14
    {"id": "bcc4", color: 4},  // 14 38
    {"id": "bcc5", color: 5},  // 103 101 100 95 66 72 71 70 83
    {"id": "bcc6", color: 6},  // 92 60 88 76
    {"id": "bcc7", color: 7},  // 84 48
    {"id": "bcc8", color: 8},  // 12 18
    {"id": "bcc9", color: 9},  // 
    {"id": "bcc10", color: 10},  // 81 24
    {"id": "bcc11", color: 11},  // 3 24
    {"id": "bcc12", color: 0},  // 3 3 // ?
    {"id": "46", cut: 1},
    {"id": "48", cut: 1},
    {"id": "76", cut: 1},
    {"id": "83", cut: 1},
    {"id": "14", cut: 1},
]

export let edges = [
    {"source": "3", "target": "bcc12", "value": 1},
    {"source": "bcc8", "target": "18", "value": 1},
    {"source": "3", "target": "bcc11", "value": 1},
    {"source": "bcc11", "target": "24", "value": 1},
    {"source": "bcc2", "target": "38", "value": 1},
    {"source": "14", "target": "bcc4", "value": 1},
    {"source": "bcc4", "target": "38", "value": 1},
    {"source": "46", "target": "bcc1", "value": 1},
    {"source": "14", "target": "bcc3", "value": 1},
    {"source": "24", "target": "bcc10", "value": 1},
    {"source": "83", "target": "bcc5", "value": 1},
    {"source": "48", "target": "bcc7", "value": 1},
    {"source": "76", "target": "bcc6", "value": 1},
    {"source": "bcc9", "target": "24", "value": 1},
    {"source": "bcc9", "target": "38", "value": 1},
    {"source": "bcc9", "target": "18", "value": 1},
    {"source": "bcc9", "target": "46", "value": 1},
    {"source": "bcc9", "target": "48", "value": 1},
    {"source": "bcc9", "target": "83", "value": 1},
    {"source": "bcc9", "target": "76", "value": 1},
]