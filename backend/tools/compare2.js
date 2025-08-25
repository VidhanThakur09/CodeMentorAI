
export default function compare2(data, k) {
  let map = {};
  let max = 0;
  let ans = [];
  data.forEach((element) => {
    if (map[element] === undefined) {
      map[element] = 1;
    } else {
      map[element]++;
    }
    max = Math.max(map[element],max);
  });

  let sortedObject = Object.fromEntries(
    Object.entries(map).sort(([a, ], [b, ]) => a - b)
  );

  Object.keys(map).forEach((key) => {
    if (map[key] > max - k) {
      ans.push(key);
    }
  });
  return ans;
}
// compare2([1, 2, 2, 3, 3, 3,4],2);