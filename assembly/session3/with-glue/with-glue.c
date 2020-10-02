#include <emscripten.h>
#include <stdbool.h>

#define BOUNDS 255
#define RECT_SIDE 50
#define BOUNCE_POINT (BOUNDS - RECT_SIDE)

bool running = true;

typedef struct Rect {
  char direction;
  int x;
  int y;
} Rect;

struct Rect rect;

void updateRectLocation() {
    if (rect.x == BOUNCE_POINT) {
        rect.direction = 'L';
    }
    if (rect.x == 0) {
        rect.direction = 'R';
    }
    int incrementer = 1;
    if (rect.direction == 'L') {
        incrementer = -1;
    }
    rect.x = rect.x + incrementer;
    rect.y = rect.y + incrementer;
}

EM_JS(void, js_clear_rect, (), {
    var canvas = document.querySelector('#myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, 255, 255);
});

EM_JS(void, js_fill_rect, (int x, int y, int width, int height), {
    var canvas = document.querySelector('#myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(x, y, width, height);
});

EMSCRIPTEN_KEEPALIVE
void moveRect() {
    js_clear_rect();
    updateRectLocation();
    js_fill_rect(rect.x, rect.y, RECT_SIDE, RECT_SIDE);
}

EMSCRIPTEN_KEEPALIVE
bool isRunning() {
    return running;
}

EMSCRIPTEN_KEEPALIVE
void setRunning(bool b) {
    EM_ASM({
        var newStatus = $0 ? 'Running' : 'Paused';
        document.querySelector('#runStatus').innerHTML = newStatus;
    }, running = b);
}

EMSCRIPTEN_KEEPALIVE
void init() {
    emscripten_run_script("console.log('Initializing rectangle...')");
    rect.x = 0;
    rect.y = 0;
    rect.direction = 'R';
    setRunning(true);
    emscripten_run_script("console.log('Rectangle should be moving!')");
}

// chapter 6 with-glue compile command in console.
// emcc with-glue.c -Os -s WASM=1 -s MODULARIZE=1 -o with-glue.js
