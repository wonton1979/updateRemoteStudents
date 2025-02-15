const updateRemoteStudents = require('../updateRemoteStudents');

describe('updateRemoteStudents', () => {
    describe('Functionality Test', () => {
        test('function should return an empty array when the argument passed in is an empty array', () => {
            //arrange
            const input = [];
            //act
            const result = updateRemoteStudents(input);
            //assert
            expect(result).toEqual([]);
        })

        test("function should return an array with untouched student object " +
            "when only one object in the array and 'location' key is exist", () => {
            //arrange
            const input = [{ name: "Hypatia", age: 31, location: "leeds" }];
            //act
            const result = updateRemoteStudents(input);
            //assert
            expect(result).toEqual([{ name: "Hypatia", age: 31, location: "leeds" }])
        })

        test("function should return an array with untouched student objects when more than one objects in the array " +
            "and all objects' 'location' key are exist", () => {
            //arrange
            const input = [{ name: "Hypatia", age: 31, location: "leeds" },{ name: "Tao", age: 47, location: "manchester" }];
            //act
            const result = updateRemoteStudents(input);
            //assert
            expect(result).toEqual([{ name: "Hypatia", age: 31, location: "leeds" },{ name: "Tao", age: 47, location: "manchester" }])
        })

        test("when the array passed in only contains one student object which without 'location' key," +
            "Then the result should return this array with key 'location' added to the object and set it's value to 'remote'" , () => {
            //arrange
            const input = [{ name: "Ramanujan", age: 22 }];
            //act
            const result = updateRemoteStudents(input);
            //assert
            expect(result).toEqual([{ name: "Ramanujan", age: 22, location: "remote" }]);
        })

        test("when the array passed in contains more than one student objects which all of them are without 'location' key," +
            "Then the result should return this array with key 'location' added  and set it's value to 'remote'" , () => {
            //arrange
            const input = [{ name: "Ramanujan", age: 22 },{ name: "Jane", age: 30 }];
            //act
            const result = updateRemoteStudents(input);
            //assert
            expect(result).toEqual([{ name: "Ramanujan", age: 22, location: "remote" },{ name: "Jane", age: 30 ,location: "remote" }]);
        })

        test("when the array passed in contains mix student objects, some of them have key location but others don't" +
            "Then return array should has the key 'location' added and set it's value to 'remote' for student objects which missing the location key" +
            "and keep rest of the student objects untouched" , () => {
            //arrange
            const input = [
                { name: "Ramanujan", age: 22 },
                { name: "Jane", age: 30 },
                { name: "Hypatia", age: 31, location: "leeds" },
                { name: "Tao", age: 47, location: "manchester" }];
            //act
            const result = updateRemoteStudents(input);
            //assert
            expect(result).toEqual([
                { name: "Ramanujan", age: 22, location: "remote" },
                { name: "Jane", age: 30 ,location: "remote" },
                { name: "Hypatia", age: 31, location: "leeds" },
                { name: "Tao", age: 47, location: "manchester" }
            ]);
        })

        describe('Function Purity Test', () => {
            test("check if the passed in array has been mutated if array is empty", () => {
                //arrange
                const input = [];
                const copyInput = [];
                //act
                updateRemoteStudents(input);
                //assert
                expect(input).toEqual(copyInput);
            })

            test("check if the passed in array has been mutated if array contains only one object with location key", () => {
                //arrange
                const input = [{ name: "Hypatia", age: 31, location: "leeds" }];
                const copyInput = [{ name: "Hypatia", age: 31, location: "leeds"}];
                //act
                updateRemoteStudents(input);
                //assert
                expect(input).toEqual(copyInput);
            })

            test("check if the passed in array has been mutated if array contains only one object without location key", () => {
                //arrange
                const input = [{ name: "Ramanujan", age: 22 }];
                const copyInput = [{ name: "Ramanujan", age: 22 }];
                //act
                updateRemoteStudents(input);
                //assert
                expect(input).toEqual(copyInput);
            })

            test("check if the passed in array has been mutated if array contains more than one objects. some of the objects has location key," +
                "rest of them without location key", () => {
                //arrange
                const input = [
                    { name: "Ramanujan", age: 22, location: "remote" },
                    { name: "Jane", age: 30 ,location: "remote" },
                    { name: "Hypatia", age: 31, location: "leeds" },
                    { name: "Tao", age: 47, location: "manchester" }
                ];
                const copyInput = [
                    { name: "Ramanujan", age: 22, location: "remote" },
                    { name: "Jane", age: 30 ,location: "remote" },
                    { name: "Hypatia", age: 31, location: "leeds" },
                    { name: "Tao", age: 47, location: "manchester" }
                ];
                //act
                updateRemoteStudents(input);
                //assert
                expect(input).toEqual(copyInput);
            })

            test("'Check if function return a new reference array'", () => {
                //arrange
                const input = [
                    { name: "Ramanujan", age: 22, location: "remote" },
                    { name: "Jane", age: 30 ,location: "remote" },
                    { name: "Hypatia", age: 31, location: "leeds" },
                    { name: "Tao", age: 47, location: "manchester" }
                ];
                //act
                const output = updateRemoteStudents(input);
                //assert
                expect(input).not.toBe(output);
            })
        })
    })
})