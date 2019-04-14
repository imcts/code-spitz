//= 원본 코드
function originalCode() {
  // 변수의 초기화
  var res = "";
  
  // 미로의 초기화
  var w = 55;
  var h = 35;
  var maze = new Array(w * h);
  for (var y = 1; y < h - 1; y ++) {
    for (var x = 1; x < w - 1; x ++) {
      maze[x + w * y] = 1;
    }
  }
  
  // 개시위치, 방향, 패턴
  var startX = w - 5;		// 코드골프용 : 고정위치
  var startY = 4;			// 코드골프용 : 고정위치
  var dir = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  var pattern =
    [[0, 1, 2, 3]
      ,[0, 1, 3, 2]
      ,[0, 2, 1, 3]
      ,[0, 2, 3, 1]
      ,[0, 3, 1, 2]
      ,[0, 3, 2, 1]
      ,[1, 0, 2, 3]
      ,[1, 0, 3, 2]
      ,[1, 2, 0, 3]
      ,[1, 2, 3, 0]
      ,[1, 3, 0, 2]
      ,[1, 3, 2, 0]
      ,[2, 0, 1, 3]
      ,[2, 0, 3, 1]
      ,[2, 1, 0, 3]
      ,[2, 1, 3, 0]
      ,[2, 3, 0, 1]
      ,[2, 3, 1, 0]
      ,[3, 0, 1, 2]
      ,[3, 0, 2, 1]
      ,[3, 1, 0, 2]
      ,[3, 1, 2, 0]
      ,[3, 2, 0, 1]
      ,[3, 2, 1, 0]];
  
  // 구멍 뚫기
  function dig(x, y) {
    // 코드골프용 : 랜덤함수를 사용하지 않고 생성하기
    var type = (x + 3) * (y + 5) * 7 % pattern.length;
    for (var i = 0; i < dir.length; i++) {
      var next = dir[pattern[type][i]];
      if (maze[(x + next[0] * 2) + w * (y + next[1] * 2)] == 1) {
        maze[(x + next[0] * 2) + w * (y + next[1] * 2)] = 0;
        maze[(x + next[0]    ) + w * (y + next[1]    )] = 0;
        dig(x + next[0] * 2, y + next[1] * 2);
      }
    }
  }
  dig(startX, startY);
  
  // 출력결과 생성
  for (var y = 0; y < h; y ++) {
    for (var x = 0; x < w; x ++) {
      if (maze[x + w * y] == 1) {
        res += "■";
      } else {
        res += "　";
      }
    }
    res += "\n";
  }
  
  // 결과를 리턴하고 종료
  return res;
}
