import { output } from './main.js';

export class CustomError {
  constructor(error) {
    this.error = error;
  }

  render() {
    const errorNode = `
    <div class="alert alert-danger" role="alert">
    Error - ${
      this.error.statusText && this.error.status
        ? this.error.statusText + ' ' + this.error.status
        : this.error
    }
    </div>
        `;
    output.innerHTML = errorNode;
  }
}
