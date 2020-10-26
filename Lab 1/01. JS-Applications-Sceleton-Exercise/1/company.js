class Company {
    constructor() {
        this.departments = [];
        this.realDeps = {};
    }

    addEmployee(username, salary, position, department) {
        if (!username || (!salary && salary !== 0) || !position || !department || Number(salary) < 0) {
            throw new Error('Invalid input!');
        }

        if (!this.realDeps[department]) {
            this.realDeps[department] = [];
        }

        this.realDeps[department].push({username, salary: Number(salary), position});

        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    getHightstAvgSalaryDep() {
        
        let dep = Object.keys(this.realDeps)
            .sort((d1, d2) => {
                let avgD1 = this.realDeps[d1].reduce((acc, employee) => acc + Number(employee.salary) , 0) / this.realDeps[d1].length;
                let avgD2 = this.realDeps[d2].reduce((acc, employee) => acc + Number(employee.salary) , 0) / this.realDeps[d2].length;

                return avgD2 - avgD1;
            })[0];

        let avg = this.realDeps[dep].reduce((acc, employee) => acc + Number(employee.salary) , 0) / this.realDeps[dep].length;
        
        return {
            dep, 
            avg
        }
    }

    bestDepartment() {
        let result = '';

        result += `Best Department is: ${this.getHightstAvgSalaryDep().dep}\n`;
        result += `Average salary: ${this.getHightstAvgSalaryDep().avg.toFixed(2)}\n`;

        result += this.realDeps[this.getHightstAvgSalaryDep().dep]
            .sort((e1, e2) => {
                if (e1.salary === e2.salary) {
                    return e1.username.localeCompare(e2.username);
                }

                return e2.salary - e1.salary;
            })
            .map(employee => {
                return `${employee.username} ${employee.salary} ${employee.position}`;
            }).join('\n');

        return result;
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
