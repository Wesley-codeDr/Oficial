// Pure quicksort implementation (non-mutating, Hoare partition scheme).
// Returns a new array sorted in ascending order.
function quickSort(values) {
  if (!Array.isArray(values)) {
    throw new TypeError("quickSort expects an array");
  }

  const arr = [...values];

  const swap = (a, b) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  };

  const partition = (low, high) => {
    const pivot = arr[Math.floor((low + high) / 2)];
    let left = low;
    let right = high;

    while (left <= right) {
      while (arr[left] < pivot) left += 1;
      while (arr[right] > pivot) right -= 1;

      if (left <= right) {
        swap(left, right);
        left += 1;
        right -= 1;
      }
    }

    return left;
  };

  const sort = (low, high) => {
    if (low >= high) return;
    const index = partition(low, high);
    sort(low, index - 1);
    sort(index, high);
  };

  sort(0, arr.length - 1);
  return arr;
}

// Example usage when running this file directly:
if (require.main === module) {
  const sample = [5, 3, 8, 4, 2, 7, 1, 10];
  console.log("input :", sample);
  console.log("sorted:", quickSort(sample));
}

module.exports = { quickSort };
