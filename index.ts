abstract class Login {
  public login () {
    // do 1.
    // do 2.
    this._login();
    // move home.
  }

  protected abstract _login(): void;
}

class Naver extends Login {
  protected _login (): void {

  }
}

class Kakao extends Login {
  protected _login (): void {

  }
}

// Cohesion

// Coincidental Cohesion.
// Logical Cohesion.
// Temporal Cohesion.
// Procedural Cohesion.
// Communicational Cohesion.
// Sequential Cohesion.
// Functional Cohesion. 좋은거.
