export const getAlgorithmUtils = (sideLength, wallTiles, visited) => {
  const isWin = tile => {
    return tile === sideLength * sideLength - 2;
  };
  const isBorder = tile => {
    return (
      tile < sideLength ||
      tile >= sideLength * (sideLength - 1) ||
      tile % sideLength === 0 ||
      (tile + 1) % sideLength === 0
    );
  };
  const isWall = tile => {
    if (isBorder(tile) === true && isWin(tile) === false) return true;
    return wallTiles.find(wallTile => wallTile === tile) !== undefined;
  };
  const isVisited = tile => {
    return (
      visited.find(element => {
        return element === tile;
      }) !== undefined
    );
  };
  const generateNodes = tile => {
    const right = tile + 1;
    const down = tile + sideLength;
    const left = tile - 1;
    const up = tile - sideLength;
    const childNodes = [];

    if (isWall(right) === false) childNodes.push(right);
    if (isWall(down) === false) childNodes.push(down);
    if (isWall(left) === false) childNodes.push(left);
    if (isWall(up) === false) childNodes.push(up);

    return childNodes;
  };
  const visitNode = node => {
    visited.push(node);
  };

  return {
    isWin: isWin,
    isBorder: isBorder,
    isWall: isWall,
    isVisited: isVisited,
    generateNodes: generateNodes,
    visitNode: visitNode
  };
};
