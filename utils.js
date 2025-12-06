
/*
"Zips" 2 arrays
Sample: input [1, 2, 3] and [4, 5, 6] gives [[1, 4], [2, 5], [3, 6]]
*/
function zip(arr1, arr2){
    return arr1.map((item, i) => [item, arr2[i]])
}

/*
For an array of strings in the form of space separated numbers return an array of number arrays.
Sample: input ["1 2 3", "4 5"] gives [[1, 2, 3], [4, 5]]

*/
function parseNumbers(lines){
    return lines.map(s => s.split(/\s+/).map(Number))
}

/*
For array of numbers returns array of differences between consecutive numbers.
Sample: input [1, 2, 2, 0] gives [1, 0, -2]
*/
function diffs(numbers){
    return numbers.slice(1).map((n, i) => n - numbers[i]);
}

/*
For a number returns array of it's factors
Sample: input 10 gives [1, 2, 5]
*/
function factors(n) {
    let divisors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            if (n / i === i || i === 1) {
                divisors.push(i);
            }
            else {
                divisors.push(i);
                divisors.push(n / i);
            }
        }
    }
    return divisors;
}

/*
Creates an array with a range of numbers
Sample: for (1, 4) it returns [1, 2, 3, 4]
*/
function range(from, to){
    const arr = []
        if(from > to){
        return arr
    }
    for (let i = from; i <= to; i++){
        arr.push(i)
    }
    return arr
}

/*
Merge 2 ranges defined as 2 element arrays, return array of 2 element arrays with merged ranges
Sample: for [2, 3], [4, 5] it returns [[2, 3], [4, 5]]
        for [2, 5], [4, 7] it returns [[2, 7]]
*/
function mergeRanges([from1, to1], [from2, to2]){
    if(to1 < from2){
        return [[from1, to1], [from2, to2]]
    }     
    else if(from1 > to2){
        return [[from2, to2], [from1, to1]]
    }
    else {
        return [[Math.min(from1, from2),  Math.max(to1, to2)]]
    }
}

/*
Return coordinates of adjacent points.
For a given x,y point returns an array od 2D arrays with coordinates of adjacent points
*/
function adjacentPoints(x, y){
    return [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
        .map(([x0, y0]) => [x + x0, y + y0])
}

/*
Return transposed 2D array
 */
function transpose(array2D){
    const w = array2D[0].length
    const transposed = Array.from({length: w}, () => [])
    array2D.forEach((row, i) => row.forEach((cell, j) => transposed[j].push(cell)))
    return transposed
}

export {
    zip, 
    parseNumbers,
    diffs,
    factors,
    range,
    adjacentPoints,
    mergeRanges,
    transpose
}