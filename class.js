class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(num) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (newCell && this.multiply >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Grass(newX, newY, 1);
            this.multiply = 0;

        }
    }
}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
        this.acted = false;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }

    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(0));//Գտնել շրջակա դատարկ վանդակները_Պատահականության սկզբունքով ընտրել դրանցից մեկը
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;//Մատրիցում նախորդ վանդակի թիվը դարձնել 0

                this.x = newX;//Փոխել այդ խոտակերի this.x 
                this.y = newY;//եւ this.y հատկանիշների արժեքները նոր վանդակի կորդինատներով

            }
            this.energy--;//Փոքրացնել էներգիան 1-ով
            if (this.energy <= 0) {
                this.die();
            }
            this.acted = true;
        }

    }
    eat() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(1));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.energy++;
                if (this.energy >= 9
                ) {
                    this.mul();
                    this.energy = 6;
                }
                this.acted = true;
            }
            else {
                this.move();
            }
        }

    }
    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new GrassEater(newX, newY, 2);
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
    }

}

class Gishatich {
    constructor(x, y, index) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.energy = 7;
        this.acted = false;
        this.directions = [];


    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];


                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.energy--;

                if (this.energy <= 0) {
                    this.die();
                }
                this.acted = true;
            }
        }
    }
    eat() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(2));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.energy++;
                if (this.energy >= 22) {
                    this.mul();
                    this.energy = 5;
                }
                this.acted = true;
            }
            else {
                this.move();
            }
        }

    }
    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Gishatich(newX, newY, 3);

        }
    }


    die() {
        matrix[this.y][this.x] = 0;
    }



}



class Aylmolorakayin {
    constructor(x, y, index) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.energy = 1;
        this.acted = false;
        this.directions = [];


    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }
    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    chooseCell1(num, num1, num2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num || matrix[y][x] == num1 || matrix[y][x] == num2) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num || matrix[y][x].index == num1 || matrix[y][x].index == num2) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }

    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];


                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.energy--;

                if (this.energy <= 0) {
                    this.die();
                }
                this.acted = true;
            }
        }
    }
    eat() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell1(1, 2, 3));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                if (matrix[newY][newX] == 1) {
                    this.energy++;
                }
                else if (matrix[newY][newX] == 2 || matrix[newY][newX] == 3) {
                    this.energy += 2;
                }

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                // if (this.energy >= 15) {
                //     this.mul();
                //     this.energy = 9;
                // }
                this.acted = true;
            }
            else {
                this.move();
            }
        }

    }
    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Aylmolorakayin(newX, newY, 4);

        }
    }
    die() {
        matrix[this.y][this.x] = 0;
    }


}



class Lazer {
    constructor(x, y, index) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.energy =8;
        this.acted = false;
        this.directions = [];
        this.directions1 = [];


    }

    getNewCoordinates() {
        this.directions = [
            [this.x, this.y - 4],
            [this.x, this.y - 3],
            [this.x, this.y - 2],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y + 3],
            [this.x, this.y + 4],
        ];

        this.directions1 = [
            [this.y, this.x - 4],
            [this.y, this.x - 3],
            [this.y, this.x - 2],
            [this.y, this.x - 1],
            [this.y, this.x + 1],
            [this.y, this.x + 2],
            [this.y, this.x + 3],
            [this.y, this.x + 4],

        ];
    }
    chooseCell1(num, num1, num2, num3) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num || matrix[y][x] == num1 || matrix[y][x] == num2 || matrix[y][x] == num3) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num || matrix[y][x].index == num1 || matrix[y][x].index == num2 || matrix[y][x].index == num3) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }

    chooseCell(num, dir) {
        this.getNewCoordinates();
        var found = [];
        for (var i in dir) {
            var x = dir[i][0];
            var y = dir[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(0, this.directions));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];


                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.energy--;

                if (this.energy <= 3) {
                    this.die();
                }
                this.acted = true;
            }
        }
    }
    eat() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell1(1, 2, 3, 4));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.energy++;
                console.log("eat");
                if (this.energy >= 10) {
                    this.mul();
                    this.energy = 5;
                }
                this.acted = true;
            }
            else {
                this.move();
            }
        }

    }
    mul() {
        var newCell = random(this.chooseCell(0, this.directions1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Lazer(newX, newY, 5);

        }
    }
    die() {
        matrix[this.y][this.x] = 0;
    }


}