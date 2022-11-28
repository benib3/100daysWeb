class Job {
  constructor(jobTitle, place, salary) {
    this.title = jobTitle;
    this.location = place;
    this.salary = salary;
  }
  desribe() {
    console.log(
      `I am a ${this.title}, I work in ${this.location} and I earn ${this.salary}.`
    );
  }
}

//const dev = new Job("Devs", "Morroco", 50000);
const job = { title: "dev", location: "ny" };
const arr = ["dev", "ny"];
//array distructuring
const [tit, loc] = arr;
//accesing properties of object
const { title } = job;
console.log(title);
//console.log(dev.desribe());
