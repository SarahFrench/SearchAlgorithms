function isSuperset(set, subset) {
    for (var elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

function difference(setA, setB) {
    var _difference = new Set(setA);
    for (var elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}

const NUMBERS = new Set([1,2,3,4,5,6,7,8,9]);

module.exports = {
  isSuperset,
  difference,
  NUMBERS
}
