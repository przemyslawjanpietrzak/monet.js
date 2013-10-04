describe("An immutable list", function () {

    beforeEach(function () {
        this.addMatchers({
            toBeSomeMaybe: function (expected) {
                return this.actual.isSome();
            },
            toBeSomeMaybeWith: function (expected) {
                return this.actual.some() == expected
            },
            toBeSomeMaybeWithList: function (expected) {
                return this.actual.some().toArray() === expected
            },
            toBeNoneMaybe: function () {
                return this.actual.isNone()
            }
        });
    })

    var list = List(1, List(2, List(3, List(4, Nil))))

    var plusOne = function (a) {
        return a + 1
    };


    it("can be converted to Array", function () {
        expect(list.toArray()).toEqual([1, 2, 3, 4])
    })

    it("can be created from an Array", function () {
        expect([1, 2, 3, 4].list()).toEqual(list)
    })

    it("can be mapped", function () {
        var mappedList = list.map(plusOne)
        expect(mappedList.head).toBe(2)
        expect(mappedList.tail.head).toBe(3)
        expect(mappedList.tail.tail.head).toBe(4)
        expect(mappedList.tail.tail.tail.head).toBe(5)
    })

    it("can be reduced using foldLeft", function () {
        expect(list.foldLeft(0)(function (acc, e) {
            return acc + e
        })).toEqual(10)
    })

    it("will have cons available on objects", function () {
        expect("fun".cons(list).toArray()).toEqual(["fun", 1, 2, 3, 4])
    })

    it("will be transformed by a flatMap", function () {
        expect(list.flatMap(function (e) {
            return [e * e, e + e].list()
        }).toArray()).toEqual([1, 2, 4, 4, 9, 6, 16, 8])
    })

    it("will be append another list", function () {
        expect(list.append([5, 6, 7].list()).toArray()).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    describe("will flatten inner lists", function() {
        it("with two elements", function () {
            expect([[1, 2].list(), [3, 4].list()].list().flatten().toArray()).toEqual([1, 2, 3, 4])
        })
        it("with one element", function() {
            expect([[1,2].list()].list().flatten().toArray()).toEqual([1,2])
        })

    })

    describe("will sequence a list", function () {
        describe("of Maybes", function () {
//            it("with one defined element", function () {
//                expect(List(Some("hello")).sequenceMaybe().some().toArray()).toEqual(["hello"])
//            })
//            it("with multiple defined elements", function() {
//                expect(List(Some(1),Some(2),Some(3)).sequenceMaybe().some().toArray()).toBeSomeMaybeWithList([1,2,3])
//            })
        })
    })
})