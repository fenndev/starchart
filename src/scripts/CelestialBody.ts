export default class CelestialBody {
    private position: [number, number];
    private velocity: [number, number];

    constructor(
    private semiMajorAxis: number,
    private eccentricity: number,
    private meanAnomaly: number,
    private mass: number
  ) {
    this.position = [0, 0];
    this.velocity = [0, 0];
    this.calculateOrbit(0);
  }

  public calculateOrbit(time: number): [number, number] {
    let currentAnomaly = this.calculateAnomaly(time);
    let force = this.calculateForce();
    let velocity = this.calculateVelocity(force);
    this.calculatePosition(time);

    // Calculate the planet's position in its orbit
    let x = this.semiMajorAxis * (Math.cos(currentAnomaly) - this.eccentricity);
    let y = this.semiMajorAxis * Math.sin(currentAnomaly);

    return [x, y];
  }

  private calculateAnomaly = (time: number) => this.meanAnomaly + time * Math.sqrt(this.mass / Math.pow(this.semiMajorAxis, 3));

  private calculateForce = () => this.mass / Math.pow(this.semiMajorAxis * (1 - this.eccentricity * this.eccentricity), 1.5);

  private calculateVelocity = (force: number) => Math.sqrt((force * this.semiMajorAxis * (1 + this.eccentricity)) / (1 - this.eccentricity));

  private calculatePosition(time: number) {
    this.position[0] += this.velocity[0] * time;
    this.position[1] += this.velocity[1] * time;
  }
}
