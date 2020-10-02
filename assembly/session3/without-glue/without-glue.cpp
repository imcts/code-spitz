#define BOUNDS 255
#define CIRCLE_RADIUS 50
#define BOUNCE_POINT (BOUNDS - CIRCLE_RADIUS)

bool running = true;

typedef struct Circle {
  char direction;
  int x;
  int y;
} Circle;

struct Circle circle;

void updateCircleLocation() {
    if (circle.x == BOUNCE_POINT) {
        circle.direction = 'L';
    }
    if (circle.x == CIRCLE_RADIUS) {
        circle.direction = 'R';
    }
    int incrementer = 1;
    if (circle.direction == 'L') {
        incrementer = -1;
    }
    circle.x = circle.x + incrementer;
    circle.y = circle.y - incrementer;
}

extern "C" {
    extern int jsClearCircle();
    extern int jsFillCircle(int x, int y, int radius);

    void moveCircle() {
        jsClearCircle();
        updateCircleLocation();
        jsFillCircle(circle.x, circle.y, CIRCLE_RADIUS);
    }

    bool isRunning() {
        return running;
    }

    void setRunning(bool b) {
        running = b;
    }

    void init() {
        circle.x = 0;
        circle.y = 255;
        circle.direction = 'R';
        setRunning(true);
    }
}

// console command
// emcc without-glue.cpp -Os -s WASM=1 -s SIDE_MODULE=1 -s BINARYEN_ASYNC_COMPILATION=0 -o without-glue.wasm



