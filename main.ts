namespace SpriteKind {
    export const cat = SpriteKind.create()
    export const EFIRE = SpriteKind.create()
    export const MUSH = SpriteKind.create()
    export const MULTISHOTT = SpriteKind.create()
    export const Power = SpriteKind.create()
}
function doSomething3 (num: number, num2: number) {
    if (face == 8) {
        projectile = sprites.createProjectileFromSprite(img`
            b b 
            b b 
            `, Gun, -200, -200)
        projectile.vx += num
        projectile.vy += num2
    } else if (face == 7) {
        projectile = sprites.createProjectileFromSprite(img`
            b b 
            b b 
            `, Gun, 200, -200)
        projectile.vx += num
        projectile.vy += num2
    } else if (face == 6) {
        projectile = sprites.createProjectileFromSprite(img`
            b b 
            b b 
            `, Gun, 200, 200)
        projectile.vx += num
        projectile.vy += num2
    } else if (face == 5) {
        projectile = sprites.createProjectileFromSprite(img`
            b b 
            b b 
            `, Gun, -200, 200)
        projectile.vx += num
        projectile.vy += num2
    } else if (face == 1) {
        projectile = sprites.createProjectileFromSprite(img`
            b b 
            b b 
            `, Gun, 0, -200)
        projectile.vx += num
    } else if (face == 2) {
        projectile = sprites.createProjectileFromSprite(img`
            b b 
            b b 
            `, Gun, -200, 0)
        projectile.vy += num2
    } else if (face == 3) {
        projectile = sprites.createProjectileFromSprite(img`
            b b 
            b b 
            `, Gun, 200, 0)
        projectile.vy += num2
    } else if (face == 4) {
        projectile = sprites.createProjectileFromSprite(img`
            b b 
            b b 
            `, Gun, 0, 200)
        projectile.vx += num
    }
    projectile.setFlag(SpriteFlag.AutoDestroy, false)
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(mySprite, "RApict"))) {
        shoot()
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (sprites.readDataNumber(sprite, "HP") <= 0) {
        sprite.destroy(effects.disintegrate, 500)
        if (sprites.readDataNumber(sprite, "T") == 5) {
            for (let value of tiles.getTilesByType(assets.tile`myTile35`)) {
                tiles.setTileAt(value, assets.tile`transparency16`)
                tiles.setWallAt(value, false)
                pause(100)
            }
        }
        if (sprites.readDataNumber(sprite, "T") == 8) {
            for (let value of tiles.getTilesByType(assets.tile`myTile35`)) {
                tiles.setTileAt(value, assets.tile`transparency16`)
                tiles.setWallAt(value, false)
                pause(100)
            }
        }
    } else {
        doSomething2(sprite, sprites.readDataNumber(sprite, "T"))
        sprites.setDataImageValue(sprite, "Image", sprite.image.clone())
        timer.after(50, function () {
            sprite.image.replace(12, 2)
            sprite.image.replace(8, 2)
            sprite.image.replace(10, 2)
            sprite.image.replace(6, 3)
            sprite.image.replace(11, 3)
            sprite.image.replace(8, 2)
            sprite.image.replace(1, 3)
        })
        sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        if (!(sprites.readDataNumber(sprite, "T") == 5)) {
            sprite.vx = 0
        }
        sprites.changeDataNumberBy(sprite, "HP", -1)
        timer.after(150, function () {
            sprite.setImage(sprites.readDataImage(sprite, "Image"))
            sprite.vx = sprites.readDataNumber(sprite, "m")
            sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
            doSomething2(sprite, sprites.readDataNumber(sprite, "T"))
        })
    }
    otherSprite.destroy()
})
function old_levels () {
    tiles.setCurrentTilemap(tilemap`level1`)
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    All_powers()
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    statusbar.max = 20
    statusbar.value = 20
    doSomething()
})
function doSomething () {
    tiles.setCurrentTilemap(tileUtil.cloneMap(list[levelthing]))
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile15`)
    for (let value of tiles.getTilesByType(assets.tile`myTile15`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile17`)) {
        E = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . a a a a . . . . . 
            . . . . . . a a a a a a . . . . 
            . . . . . . a a c c c c . . . . 
            . . . . . . a c c b c b . . . . 
            . . . . . . a c c c c b . . . . 
            . . . . . . a a c c c c . . . . 
            . . . . . 8 a a a a a a . . . . 
            . . . . . a 8 a a a a a a . . . 
            . . . . a a a 8 8 a a a a . . . 
            . . . . a a a a a 8 8 a a . . . 
            . . . . a a a a a a a 8 a . . . 
            . . . b b b a a a a a 8 . . . . 
            . . . . b . a a a a a a . . . . 
            . . . . b . a a a a a a . . . . 
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . a a a a . . . . . . . 
            . . . . a a a a a a . . . . . . 
            . . . . c c c c a a . . . . . . 
            . . . . b c b c c a . . . . . . 
            . . . . b c c c c a . . . . . . 
            . . . . c c c c a a . . . . . . 
            . . . . a a a a a a 8 . . . . . 
            . . . a a a a a a 8 a . . . . . 
            . . . a a a a 8 8 a a a . . . . 
            . . . a a 8 8 a a a a a . . . . 
            . . . a 8 a a a a a a a . . . . 
            . . . . 8 a a a a a b b b . . . 
            . . . . a a a a a a . b . . . . 
            . . . . a a a a a a . b . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . a a a a . . . . . 
            . . . . . . a a a a a a . . . . 
            . . . . . . a a c c c c . . . . 
            . . . . . . a c c b c b . . . . 
            . . . . . . a c c c c b . . . . 
            . . . . . . a a c c c c . . . . 
            . . . . . 8 a a a a a a . . . . 
            . . . . . a 8 a a a a a a . . . 
            . . . . a a a 8 8 a a a a . . . 
            . . . . a a a a a 8 8 a a . . . 
            . . . . a a a a a a a 8 a . . . 
            . . . b b b a a a a a 8 . . . . 
            . . . . b . a a a a a a . . . . 
            . . . . b . a a a a a a . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(E, "T", 1)
        sprites.setDataNumber(E, "HP", 3)
        tiles.placeOnTile(E, value)
        E.ay = 200
        E.vx = 70
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile23`)) {
        E = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . c c c c c c c . . . . . . . . 
            . c a a a a a c . . . . . . . . 
            . c a b a b a c . . b . . . . . 
            . c a b a a a c . b b . . . . . 
            . c a c a a c c c c c c . . . . 
            . c a a a a c c c c c c . . . . 
            . c c c c c c c c c c 8 . . . . 
            . . . . c c c c c c 8 c . . . . 
            . . . b b b b b b b c c . . . . 
            . . . . c c b c 8 b c c . . . . 
            . . . . c c c 8 c c c c . . . . 
            . . . . 8 8 8 c c c c c . . . . 
            . . . . c c c c c c c c . . . . 
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . c c c c c c c . . . . . . . . 
            . c a a a a a c . . . . . . . . 
            . c a b a b a c . . b . . . . . 
            . c a b a a a c . b b . . . . . 
            . c a c a a c c c c c c . . . . 
            . c a a a a c c c c c c . . . . 
            . c c c c c c c c c c 8 . . . . 
            . . . . c c c c c c 8 c . . . . 
            . . . b b b b b b b c c . . . . 
            . . . . c c b c 8 b c c . . . . 
            . . . . c c c 8 c c c c . . . . 
            . . . . 8 8 8 c c c c c . . . . 
            . . . . c c c c c c c c . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . c c c c c c c . 
            . . . . . . . . c a a a a a c . 
            . . . . . b . . c a b a b a c . 
            . . . . . b b . c a a a b a c . 
            . . . . c c c c c c a a c a c . 
            . . . . c c c c c c a a a a c . 
            . . . . 8 c c c c c c c c c c . 
            . . . . c 8 c c c c c c . . . . 
            . . . . c c b b b b b b b . . . 
            . . . . c c b 8 c b c c . . . . 
            . . . . c c c c 8 c c c . . . . 
            . . . . c c c c c 8 8 8 . . . . 
            . . . . c c c c c c c c . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(E, "T", 2)
        sprites.setDataNumber(E, "HP", 3)
        E.ay = 200
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile31`)) {
        E = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 3 6 . . . . . . 
            . . . . . . 3 3 6 6 6 . . . . . 
            . . . . . . 3 6 6 6 6 . . . . . 
            . . . . . 3 3 6 f 6 f . . . . . 
            . . . . . 3 6 6 6 6 f . . . . . 
            . . . . . 8 8 6 6 6 6 . . . . . 
            . . . . 3 3 8 8 6 6 3 . . . . . 
            . . . 3 3 6 8 8 8 3 3 3 . . . . 
            . . . 6 6 8 8 8 8 8 3 3 . . . . 
            . . . 6 6 8 8 8 8 8 8 3 . . . . 
            . . . 6 6 8 8 8 8 8 8 6 . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 3 . . . . . . . . 
            . . . . . 6 6 6 3 3 . 2 2 3 . . 
            . . . . . 6 6 6 6 3 2 2 2 2 2 . 
            . . . . . f 6 f 6 3 2 3 2 2 2 . 
            . . . . . f 6 6 6 6 3 . 1 . . . 
            . . . . . 6 6 6 6 8 8 . 1 . . . 
            . . . . . 3 6 6 8 8 3 1 . . . . 
            . . . . 3 3 3 8 8 8 6 3 3 . . . 
            . . . . 3 3 8 8 8 8 8 6 6 . . . 
            . . . . 3 8 8 8 8 8 8 6 6 . . . 
            . . . . 6 8 8 8 8 8 8 6 6 . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 3 6 . . . . . . 
            . . 3 2 2 . 3 3 6 6 6 . . . . . 
            . 2 2 2 2 2 3 6 6 6 6 . . . . . 
            . 2 2 2 3 2 3 6 f 6 f . . . . . 
            . . . 1 . 3 6 6 6 6 f . . . . . 
            . . . 1 . 8 8 6 6 6 6 . . . . . 
            . . . . 1 3 8 8 6 6 3 . . . . . 
            . . . 3 3 6 8 8 8 3 3 3 . . . . 
            . . . 6 6 8 8 8 8 8 3 3 . . . . 
            . . . 6 6 8 8 8 8 8 8 3 . . . . 
            . . . 6 6 8 8 8 8 8 8 6 . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(E, "T", 3)
        sprites.setDataNumber(E, "HP", 6)
        E.ay = 200
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile37`)) {
        E = sprites.create(img`
            ................................
            ..............aaaaaa............
            .............aaccccaa...........
            ............aacaaacca...........
            ......acaaaaaacaacaca...........
            .....aaaccccaacaacaca...........
            ......aaaaaaaacaacaca...........
            .....aaaccccaccacaaca...........
            ......acaaaaccaccccaa...........
            ..............aaaca.............
            ..............aaaca.............
            ..............aaaca.............
            ..............aacaa.............
            ..............aaaca.............
            .........aaaaaaaacaaaaaa........
            .....aaaacccccfffffcccccaaaa....
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        E,
        [img`
            ................................
            ..............aaaaaa............
            .............aaccccaa...........
            ............aacaaacca...........
            ......acaaaaaacaacaca...........
            .....aaaccccaacaacaca...........
            ......aaaaaaaacaacaca...........
            .....aaaccccaccacaaca...........
            ......acaaaaccaccccaa...........
            ..............aaaca.............
            ..............aaaca.............
            ..............aaaca.............
            ..............aacaa.............
            ..............aaaca.............
            .........aaaaaaaacaaaaaa........
            .....aaaacccccfffffcccccaaaa....
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        E,
        [img`
            ................................
            ............aaaaaa..............
            ...........aaccccaa.............
            ...........accaaacaa............
            ...........acacaacaaaaaaca......
            ...........acacaacaaccccaaa.....
            ...........acacaacaaaaaaaa......
            ...........acaacaccaccccaaa.....
            ...........aaccccaccaaaaca......
            .............acaaa..............
            .............acaaa..............
            .............acaaa..............
            .............aacaa..............
            .............acaaa..............
            ........aaaaaacaaaaaaaa.........
            ....aaaacccccfffffcccccaaaa.....
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(E, "T", 4)
        sprites.setDataNumber(E, "HP", 6)
        E.ay = 200
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile24`)) {
        E = sprites.create(assets.tile`myTile24`, SpriteKind.Food)
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile36`)) {
        E = sprites.create(img`
            1111111111111111111111111111111111111111111111111111111111111111
            1111111111111111113221111111111111111111111111111111111111111111
            1111111211111111112221111111111111111111111111111111111111111111
            1111113221111111122232111111111111111111111111111111111111111111
            1111112221111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111
            1111112222222223322222223311111111111111111111111111111111111111
            1111112332222222222222223311111111111111111111111111111111111111
            1111112332222222222222222211111111111111111111111111111111111111
            1111112222222233222222222211111111111111111111111111111111111111
            111111222222bb33222222223311111111111113111111111111111111111111
            111111a22bbbbbbbbb222222b311111223111122211111111111111111111111
            111111a244bbbb44bb222b22ba11112222211132211111111111111111111111
            111111ab444bb444bb22bb22ba11112322211111111111111111111111111111
            111111ab444bb444bb22b222ba11111111111111111111111111111111111111
            111111ab444bb444b22bb222ba11111111111111111111111111119999999911
            111111ab444bb444b22bb22bba11111111111111111111111111119999999911
            111111ab444bb444b22bb22bba22222222232222222222222233219999999911
            111111abbbbbbbbbb22bb222ba23322222222222222222222233219999999911
            111111abb2b2b2bbbb22bb22ba23322222222222222222222222219999999911
            111111abb2b2b2b2bb22bb22ba222aa2222a2222222222232222219999999911
            111111abbab2b2b2bbbbbb22ba222aaa22aa223322222222a222219999999911
            111111abbababababbbbbbbbbabbaaaa222a223aa222aa22a222a19999999911
            111111abbbbbbbbbbbbbbbbbbabbbaaa222a22aaa22aaa22aa22a19999999911
            111111aaaaaaaaaaaaaaaaaaaabbbaaaa22a22aaaa22aa22aa22a19999999911
            1111111111111111111abbbbbbbbbaaa22aaa22aaa22a22aaa22a19999999911
            1111111111111111111abbbbbbbbbaaa22aaa22aaa22a22aa22aa19999999911
            1111111111111111111abbbbbbbbaaaa22aaa22aa22aa22aa22aa19999999911
            1111111111111111111aaaaaaaaaaaaaa22a22aaa22aaa22a22aa19999999911
            1111111111111111111aaaaaaaaaaaaaa22a22aaa22aaa22aa22a19999999911
            1111111111111111111aaaaaaaaaaaaaa22a22aaaa22aa22aa22a19999999911
            1111111177777777111aaaaaaaaaaaaaaaaaa22aaa22a22aaa22a19999999911
            1111111177777777111aaaaaaaaaaaaaaaaaa22aaa22a22aaaaaa19999999911
            1111111177777777111aaaaaaaaaaaaaaaaaa22aaa22a22aaaaaa19999999911
            1111111177777777111aaaaaaaaaaaaaaaaaa22aa22aa22aaaaaa19999999911
            1111111177777777111aaaaaaaaaaaaaaaaaaa22a22aaa22aaaaa19999999911
            1111111177777777111aaaaaaaaaaaaaaaaaaa22a22aaa22aaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaaa22aa22aa22aaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaa22aaa22a22aaaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaa22aaa22a22aaaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaa22aa22aa22aaaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaaa22a22aaa22aaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaaa22a22aaa22aaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaaa22aaaaaa22aaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa11111111111
            1111111177777777111aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa11111111111
            1111111177777777111111111111111111111111111111111111111111111111
            1111111177777777111111111111111111555555551116666666611111111111
            1111111177777777111111111111111111555555551116666666611111111111
            1111111177777777111111111111111111555555551116666666611111111111
            1111111177777777111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            1111111111111111111111111111111111555555551116666666611111111111
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        E,
        [img`
            ................................................................
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222..........1............................................
            .......1..........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222.............3........................
            ......222222bb332222222233.....223....222.......................
            ......a22bbbbbbbbb222222b3....22222...322.......................
            ......a244bbbb44bb222b22ba....23222....1........................
            ......ab444bb444bb22bb22ba......1......1........................
            ......ab444bb444bb22b222ba.......1....1.........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......ab444bb444b22bb22bba233222222222222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222222...........
            ......abb2b2b2bbbb22bb22ba222aa2222a22222222222322222...........
            ......abb2b2b2b2bb22bb22ba222aaa22aa223322222222a2222...........
            ......abbab2b2b2bbbbbb22babbaaaa222a223aa222aa22a222a...........
            ......abbababababbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaaa22a22aaaa22aa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaa22aaa22aaa22a22aaa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ........32222......abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22aa22a...........
            ...........1.......aaaaaa322aaaaa22a22aaaa22aa22aa22a...........
            ........33222222...aaaaa22223aaaaaaaa22aaa22a22aaa22a...........
            ........32222322...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222332a...aaaaaa1aaaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aa22222233aaaaaaaa22aa22aa22aaaaaa...........
            ........2222a22a...aa22322223aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a32a...aaa2332222aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aaa2222222aaaaaaaaa22aa22aa22aaaaa...........
            ........a222b22a...aaa22a2222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa23a233aaaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a233aaaaaaaaa22aa22aa22aaaaaa...........
            ........ab22b22a...aaa22b222aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b22baaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b22baaaaaaaaaa22aaaaaa22aaaaa...........
            ........a23b22ba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........a33bbbba...aaab22b22aaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaab22b22aaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abababba.....ab22b32a......aaaaaa.....aaaaaa............
            ........abababaa.....abbbb33a.....33222222...33222222...........
            ........aaaaaaaa.....abbbbbba.....32222233...32222233...........
            ........aaaaaaaa.....abbababa.....2222223a...2222223a...........
            ........aaaaaaaa.....aabababa.....a222b2ba...a22b22ba...........
            .....................aaaaaaaa.....a3b2b2ba...a32b2bba...........
            .....................aaaaaaaa.....abb2b2ba...ab2b2bba...........
            .....................aaaaaaaa.....abb2b2ba...ab2b2bba...........
            ..................................abb2b2ba...ab2b2bba...........
            ..................................ab22b2ba...ab2b22ba...........
            ..................................ab2bb2ba...ab2bb2ba...........
            ..................................aa2aabba...aaaab2ba...........
            ..................................aaaabbba...aaaabbba...........
            ..................................aaaaaaba...aaaaaaba...........
            ..................................aaaaaaaa...aaaaaaaa...........
            ..................................aaaaaaaa...aaaaaaaa...........
            `,img`
            ................................................................
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222.........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222......................................
            ......222222bb332222222233.............3........................
            ......a22bbbbbbbbb222222b3.....223....222.......................
            ......a244bbbb44bb222b22ba....22222...322.......................
            ......ab444bb444bb22bb22ba....23222....1........................
            ......ab444bb444bb22b222ba......1......1........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222332...........
            ......abb2b2b2bbbb22bb22ba233222222222222222222222222...........
            ......abb2b2b2b2bb22bb22ba222aa2222a22222222222322222...........
            ......abbab2b2b2bbbbbb22ba222aaa22aa223322222222a2222...........
            ......abbababababbbbbbbbbabbaaaa222a223aa222aa22a222a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaaa22a22aaaa22aa22aa22a...........
            ...................abbbbbbbbbaaa22aaa22aaa22a22aaa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ........32222......abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ..........1........aaaaaa322aaaaa22a22aaa22aaa22aa22a...........
            ...........1.......aaaaa22223aaaa22a22aaaa22aa22aa22a...........
            ........33222222...aaaaaaa1aaaaaaaaaa22aaa22a22aaa22a...........
            ........32222322...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222332a...aaaaaa1aaaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aa22222233aaaaaaaa22aa22aa22aaaaaa...........
            ........2222a22a...aa22322223aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a32a...aaa2332222aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aaa2222222aaaaaaaaa22aa22aa22aaaaa...........
            ........a222b22a...aaa22a2222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa23a233aaaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a233aaaaaaaaa22aa22aa22aaaaaa...........
            ........ab22b22a...aaa22b222aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b22baaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b22baaaaaaaaaa22aaaaaa22aaaaa...........
            ........a23b22ba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........a33bbbba...aaab22b22aaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaab22b22aaaaaaaaaaaaaaa3aaaaaa2aa...........
            ........abababba.....ab22b32a......aaaaaa..33222222.............
            ........abababaa.....abbbb33a.....33222222.32222233.............
            ........aaaaaaaa.....abbbbbba.....32222233.2222223a.............
            ........aaaaaaaa.....abbababa.....2222223a.a22b22ba.............
            ........aaaaaaaa.....aabababa.....a222b2ba.a32b2bba.............
            .....................aaaaaaaa.....a3b2b2ba.ab2b2bba.............
            .....................aaaaaaaa.....abb2b2ba.ab2b2bba.............
            .....................aaaaaaaa.....abb2b2ba.ab2b2bba.............
            ..................................abb2b2ba.ab2b22ba.............
            ..................................ab22b2ba.ab2bb2ba.............
            ..................................ab2bb2ba.aaaab2ba.............
            ..................................aa2aabba.aaaabbba.............
            ..................................aaaabbba.aaaaaaba.............
            ..................................aaaaaaba.aaaaaaaa.............
            ..................................aaaaaaaa......................
            ..................................aaaaaaaa......................
            `,img`
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222..........1............................................
            .......1..........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222......................................
            ......222222bb332222222233.............3........................
            ......a22bbbbbbbbb222222b3.....223....222.......................
            ......a244bbbb44bb222b22ba....22222...322.......................
            ......ab444bb444bb22bb22ba....23222....1........................
            ......ab444bb444bb22b222ba......1......1........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222332...........
            ......abb2b2b2bbbb22bb22ba233222222222222222222222222...........
            ......abb2b2b2b2bb22bb22ba222aa2222a22222222222322222...........
            ......abbab2b2b2bbbbbb22ba222aaa22aa223322222222a2222...........
            ......abbababababbbbbbbbbabbaaaa222a223aa222aa22a222a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaaa22a22aaaa22aa22aa22a...........
            ...................abbbbbbbbbaaa22aaa22aaa22a22aaa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ........32222......abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ...........1.......aaaaaaaaaaaaaa22a22aaa22aaa22aa22a...........
            ........33222222...aaaaaa322aaaaa22a22aaaa22aa22aa22a...........
            ........32222322...aaaaa22223aaaaaaaa22aaa22a22aaa22a...........
            ........2222332a...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222a22a...aaaaaa1aaaaaaaaaaa22aa22aa22aaaaaa...........
            ........a332a32a...aa22222233aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aa22322223aaaaaaaaa22a22aaa22aaaaa...........
            ........a222b22a...aaa2332222aaaaaaaaa22aa22aa22aaaaa...........
            ........ab22b22a...aaa2222222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a2222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa23a233aaaaaaaaa22aa22aa22aaaaaa...........
            ........a22b22ba...aaa22a233aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b222aaaaaaaaaa22a22aaa22aaaaa...........
            ........a23b22ba...aaa22b22baaaaaaaaaa22aaaaaa22aaaaa...........
            ........a33bbbba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaa22b22baaaaaaaaaaaaaa22222233aaa...........
            ........abababba...aaab22b22aaaaaaaaaaaaaa33222223aaa...........
            ........abababaa.....ab22b22a..........aaaa3222222..............
            ........aaaaaaaa.....ab22b32a..........aaaab2b222a..............
            ........aaaaaaaa.....abbbb33a.........2222ab2b2b3a..............
            ........aaaaaaaa.....abbbbbba.........3322ab2b2bba..............
            .....................abbababa.........a322ab2b2bba..............
            .....................aabababa.........ab22ab2b2bba..............
            .....................aaaaaaaa.........abb2ab2b22ba..............
            .....................aaaaaaaa.........abb2ab2bb2ba..............
            .....................aaaaaaaa.........abb2abbaa2aa..............
            ......................................abb2abbbaaaa..............
            ......................................ab22abaaaaaa..............
            ......................................ab2baaaaaaaa..............
            ......................................ab2baaaaaaaa..............
            ......................................abbbaaaa..................
            ......................................abaaaaaa..................
            ......................................aaaaaaaa..................
            `,img`
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222..........1............................................
            .......1..........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222......................................
            ......222222bb332222222233.............3........................
            ......a22bbbbbbbbb222222b3.....223....222.......................
            ......a244bbbb44bb222b22ba....22222...322.......................
            ......ab444bb444bb22bb22ba....23222....1........................
            ......ab444bb444bb22b222ba......1......1........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222332...........
            ......abb2b2b2bbbb22bb22ba233222222222222222222222222...........
            ......abb2b2b2b2bb22bb22ba222aa2222a22222222222322222...........
            ......abbab2b2b2bbbbbb22ba222aaa22aa223322222222a2222...........
            ......abbababababbbbbbbbbabbaaaa222a223aa222aa22a222a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaaa22a22aaaa22aa22aa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aaa22a...........
            ........32222......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ..........1........abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ...........1.......aaaaaaaaaaaaaa22a22aaa22aaa22aa22a...........
            ........33222222...aaaaaaaaaaaaaa22a22aaaa22aa22aa22a...........
            ........32222322...aaaaaa322aaaaaaaaa22aaa22a22aaa22a...........
            ........2222332a...aaaaa22223aaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222a22a...aaaaaaa1aaaaaaaaaa22aa22aa22aaaaaa...........
            ........a332a32a...aaaaaa1aaaaaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aa22222233aaaaaaaaa22a22aaa22aaaaa...........
            ........a222b22a...aa22322223aaaaaaaaa22aa22aa22aaaaa...........
            ........ab22b22a...aaa2332222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa2222222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a2222aaaaaaaa22aa22aa22aaaaaa...........
            ........a22b22ba...aaa23a233aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22a233aaaaaaaaaa22a22aaa22aaaaa...........
            ........a23b22ba...aaa22b222aaaaaaaaaa22aaaaaa22aaaaa...........
            ........a33bbbba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaa22b22baaaaaaaaa33222222aaaaaaaa...........
            ........abababba...aaa22b22baaaaaaaaa32222233aaaaaaaa...........
            ........abababaa.....ab22b22a........2222223aaaaa...............
            ........aaaaaaaa.....ab22b22a........a222b2ba22222..............
            ........aaaaaaaa.....ab22b32a........a3b2b2ba22233..............
            ........aaaaaaaa.....abbbb33a........abb2b2ba2223a..............
            .....................abbbbbba........abb2b2bab22ba..............
            .....................abbababa........abb2b2bab2bba..............
            .....................aabababa........ab22b2bab2bba..............
            .....................aaaaaaaa........ab2bb2bab2bba..............
            .....................aaaaaaaa........aa2aabbab2bba..............
            .....................aaaaaaaa........aaaabbbab22ba..............
            .....................................aaaaaababb2ba..............
            .....................................aaaaaaaaab2ba..............
            .....................................aaaaaaaaabbba..............
            ..........................................aaaaaaba..............
            ..........................................aaaaaaaa..............
            ..........................................aaaaaaaa..............
            `,img`
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222..........1............................................
            .......1..........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222......................................
            ......222222bb332222222233.............3........................
            ......a22bbbbbbbbb222222b3.....223....222.......................
            ......a244bbbb44bb222b22ba....22222...322.......................
            ......ab444bb444bb22bb22ba....23222....1........................
            ......ab444bb444bb22b222ba......1......1........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222332...........
            ......abb2b2b2bbbb22bb22ba233222222222222222222222222...........
            ......abb2b2b2b2bb22bb22ba222aa2222a22222222222322222...........
            ......abbab2b2b2bbbbbb22ba222aaa22aa223322222222a2222...........
            ......abbababababbbbbbbbbabbaaaa222a223aa222aa22a222a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaaa22a22aaaa22aa22aa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aaa22a...........
            ........32222......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ..........1........abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ...........1.......aaaaaaaaaaaaaa22a22aaa22aaa22aa22a...........
            ........33222222...aaaaaaaaaaaaaa22a22aaaa22aa22aa22a...........
            ........32222322...aaaaaa322aaaaaaaaa22aaa22a22aaa22a...........
            ........2222332a...aaaaa22223aaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222a22a...aaaaaa1aaaaaaaaaaa22aa22aa22aaaaaa...........
            ........a332a32a...aa22222233aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aa22322223aaaaaaaaa22a22aaa22aaaaa...........
            ........a222b22a...aaa2332222aaaaaaaaa22aa22aa22aaaaa...........
            ........ab22b22a...aaa2222222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a2222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa23a233aaaaaaaaa22aa22aa22aaaaaa...........
            ........a22b22ba...aaa22a233aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b222aaaaaaaaaa22a22aaa22aaaaa...........
            ........a23b22ba...aaa22b22baaaaaaaaaa22aaaaaa22aaaaa...........
            ........a33bbbba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abababba...aaab22b22aaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abababaa.....ab22b22a......33222222...aaaaaa............
            ........aaaaaaaa.....ab22b32a......32222233..33222222...........
            ........aaaaaaaa.....abbbb33a......2222223a..32222233...........
            ........aaaaaaaa.....abbbbbba......a222b2ba..2222223a...........
            .....................abbababa......a3b2b2ba..a22b22ba...........
            .....................aabababa......abb2b2ba..a32b2bba...........
            .....................aaaaaaaa......abb2b2ba..ab2b2bba...........
            .....................aaaaaaaa......abb2b2ba..ab2b2bba...........
            .....................aaaaaaaa......ab22b2ba..ab2b2bba...........
            ...................................ab2bb2ba..ab2b22ba...........
            ...................................aa2aabba..ab2bb2ba...........
            ...................................aaaabbba..aaaab2ba...........
            ...................................aaaaaaba..aaaabbba...........
            ...................................aaaaaaaa..aaaaaaba...........
            ...................................aaaaaaaa..aaaaaaaa...........
            .............................................aaaaaaaa...........
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        characterAnimations.loopFrames(
        E,
        [img`
            ................................................................
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            ............................................1..........222......
            .............................................1..........1.......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ........................3.............22222222223322222222......
            .......................222....322.....332222222233bb222222......
            .......................223...22222....3b222222bbbbbbbbb22a......
            ........................1....22232....ab22b222bb44bbbb442a......
            ........................1......1......ab22bb22bb444bb444ba......
            .........................1....1.......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332abb22bb22b444bb444ba......
            ...........222222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........22222322222222222a2222aa222ab22bb22bbbb2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bb22bb2b2b2b2bba......
            ...........a222a22aa222aa322a222aaaabbab22bbbbbb2b2b2babba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbababababba......
            ...........a22aa22aa22aaaa22a22aaaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aaa22a22aaa22aaa22aaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba......22223........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aa22aaaa22a22aaaaa223aaaaaa.......1...........
            ...........a22aaa22a22aaa22aaaaaaaa32222aaaaa...22222233........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaaaaa1aaaaaa...a2332222........
            ...........aaaaaa22aa22aa22aaaaaaaa33222222aa...a2222222........
            ...........aaaaa22aaa22a22aaaaaaaaa32222322aa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaa2222332aaa...a23a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa2222222aaa...a22a233a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222a22aaa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaaa332a32aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaaa332a22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa222b22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaab22b22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaab22b22aaa...ab22b22a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaa22b22baaa...abbbb33a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaa22b22baaa...abbbbbba........
            ............aaaaaa.....aaaaaa......a23b22ba.....abbababa........
            ...........22222233...22222233.....a33bbbba.....aabababa........
            ...........33222223...33222223.....abbbbbba.....aaaaaaaa........
            ...........a3222222...a3222222.....abababba.....aaaaaaaa........
            ...........ab22b22a...ab2b222a.....abababaa.....aaaaaaaa........
            ...........abb2b23a...ab2b2b3a.....aaaaaaaa.....................
            ...........abb2b2ba...ab2b2bba.....aaaaaaaa.....................
            ...........abb2b2ba...ab2b2bba.....aaaaaaaa.....................
            ...........abb2b2ba...ab2b2bba..................................
            ...........ab22b2ba...ab2b22ba..................................
            ...........ab2bb2ba...ab2bb2ba..................................
            ...........ab2baaaa...abbaa2aa..................................
            ...........abbbaaaa...abbbaaaa..................................
            ...........abaaaaaa...abaaaaaa..................................
            ...........aaaaaaaa...aaaaaaaa..................................
            ...........aaaaaaaa...aaaaaaaa..................................
            `,img`
            ................................................................
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            .............................................1.........222......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ......................................22222222223322222222......
            ........................3.............332222222233bb222222......
            .......................222....322.....3b222222bbbbbbbbb22a......
            .......................223...22222....ab22b222bb44bbbb442a......
            ........................1....22232....ab22bb22bb444bb444ba......
            ........................1......1......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            .........................1....1.......abb22bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........222222222222222222222222332ab22bb22bbbb2b2b2bba......
            ...........22222322222222222a2222aa222ab22bb22bb2b2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bbbbbb2b2b2babba......
            ...........a222a22aa222aa322a222aaaabbabbbbbbbbbababababba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aa22aa22aaaa22a22aaaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........a22aaa22a22aaa22aaa22aaabbbbbbbbba...................
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba......22223........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaa223aaaaaa........1..........
            ...........a22aa22aa22aaaa22a22aaaa32222aaaaa.......1...........
            ...........a22aaa22a22aaa22aaaaaaaaaa1aaaaaaa...22222233........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaaaaa1aaaaaa...a2332222........
            ...........aaaaaa22aa22aa22aaaaaaaa33222222aa...a2222222........
            ...........aaaaa22aaa22a22aaaaaaaaa32222322aa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaa2222332aaa...a23a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa2222222aaa...a22a233a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222a22aaa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaaa332a32aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaaa332a22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa222b22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaab22b22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaab22b22aaa...ab22b22a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaa22b22baaa...abbbb33a........
            ...........aa2aaaaaa3aaaaaaaaaaaaaaa22b22baaa...abbbbbba........
            .............22222233..aaaaaa......a23b22ba.....abbababa........
            .............33222223.22222233.....a33bbbba.....aabababa........
            .............a3222222.33222223.....abbbbbba.....aaaaaaaa........
            .............ab22b22a.a3222222.....abababba.....aaaaaaaa........
            .............abb2b23a.ab2b222a.....abababaa.....aaaaaaaa........
            .............abb2b2ba.ab2b2b3a.....aaaaaaaa.....................
            .............abb2b2ba.ab2b2bba.....aaaaaaaa.....................
            .............abb2b2ba.ab2b2bba.....aaaaaaaa.....................
            .............ab22b2ba.ab2b2bba..................................
            .............ab2bb2ba.ab2b22ba..................................
            .............ab2baaaa.ab2bb2ba..................................
            .............abbbaaaa.abbaa2aa..................................
            .............abaaaaaa.abbbaaaa..................................
            .............aaaaaaaa.abaaaaaa..................................
            ......................aaaaaaaa..................................
            ......................aaaaaaaa..................................
            `,img`
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            ............................................1..........222......
            .............................................1..........1.......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ......................................22222222223322222222......
            ........................3.............332222222233bb222222......
            .......................222....322.....3b222222bbbbbbbbb22a......
            .......................223...22222....ab22b222bb44bbbb442a......
            ........................1....22232....ab22bb22bb444bb444ba......
            ........................1......1......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            .........................1....1.......abb22bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........222222222222222222222222332ab22bb22bbbb2b2b2bba......
            ...........22222322222222222a2222aa222ab22bb22bb2b2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bbbbbb2b2b2babba......
            ...........a222a22aa222aa322a222aaaabbabbbbbbbbbababababba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aa22aa22aaaa22a22aaaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........a22aaa22a22aaa22aaa22aaabbbbbbbbba...................
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba......22223........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaaaaaaaaaaa.......1...........
            ...........a22aa22aa22aaaa22a22aaaaa223aaaaaa...22222233........
            ...........a22aaa22a22aaa22aaaaaaaa32222aaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...a2332222........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...a2222222........
            ...........aaaaaa22aa22aa22aaaaaaaaaaa1aaaaaa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaa33222222aa...a23a233a........
            ...........aaaaa22aaa22a22aaaaaaaaa32222322aa...a22a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa2222332aaa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222222aaa...a22b22ba........
            ...........aaaaaa22a22aaa22aaaaaaaa2222a22aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaaa332a32aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa332a22aaa...ab22b22a........
            ...........aaaaa22aaa22a22aaaaaaaaaa222b22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaab22b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...abbbb33a........
            ...........aaa33222222aaaaaaaaaaaaaab22b22aaa...abbbbbba........
            ...........aaa32222233aaaaaaaaaaaaaa22b22baaa...abbababa........
            ..............2222223aaaa..........a22b22ba.....aabababa........
            ..............a222b2baaaa..........a23b22ba.....aaaaaaaa........
            ..............a3b2b2ba2222.........a33bbbba.....aaaaaaaa........
            ..............abb2b2ba2233.........abbbbbba.....aaaaaaaa........
            ..............abb2b2ba223a.........abababba.....................
            ..............abb2b2ba22ba.........abababaa.....................
            ..............ab22b2ba2bba.........aaaaaaaa.....................
            ..............ab2bb2ba2bba.........aaaaaaaa.....................
            ..............aa2aabba2bba.........aaaaaaaa.....................
            ..............aaaabbba2bba......................................
            ..............aaaaaaba22ba......................................
            ..............aaaaaaaab2ba......................................
            ..............aaaaaaaab2ba......................................
            ..................aaaabbba......................................
            ..................aaaaaaba......................................
            ..................aaaaaaaa......................................
            `,img`
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            ............................................1..........222......
            .............................................1..........1.......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ......................................22222222223322222222......
            ........................3.............332222222233bb222222......
            .......................222....322.....3b222222bbbbbbbbb22a......
            .......................223...22222....ab22b222bb44bbbb442a......
            ........................1....22232....ab22bb22bb444bb444ba......
            ........................1......1......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            .........................1....1.......abb22bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........222222222222222222222222332ab22bb22bbbb2b2b2bba......
            ...........22222322222222222a2222aa222ab22bb22bb2b2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bbbbbb2b2b2babba......
            ...........a222a22aa222aa322a222aaaabbabbbbbbbbbababababba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aa22aa22aaaa22a22aaaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........a22aaa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba......22223........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba........1..........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaaaaaaaaaaa.......1...........
            ...........a22aa22aa22aaaa22a22aaaaaaaaaaaaaa...22222233........
            ...........a22aaa22a22aaa22aaaaaaaaa223aaaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaa32222aaaaa...a2332222........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...a2222222........
            ...........aaaaaa22aa22aa22aaaaaaaaaa1aaaaaaa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaaaaa1aaaaaa...a23a233a........
            ...........aaaaa22aaa22a22aaaaaaaaa33222222aa...a22a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa32222322aa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222332aaa...a22b22ba........
            ...........aaaaaa22a22aaa22aaaaaaaa2222222aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaa2222a22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa332a32aaa...ab22b22a........
            ...........aaaaa22aaa22a22aaaaaaaaaa332a22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaa222b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...abbbb33a........
            ...........aaaaaaaa22222233aaaaaaaaab22b22aaa...abbbbbba........
            ...........aaaaaaaa33222223aaaaaaaaab22b22aaa...abbababa........
            ...............aaaaa3222222........a22b22ba.....aabababa........
            ..............22222ab2b222a........a22b22ba.....aaaaaaaa........
            ..............33222ab2b2b3a........a23b22ba.....aaaaaaaa........
            ..............a3222ab2b2bba........a33bbbba.....aaaaaaaa........
            ..............ab22bab2b2bba........abbbbbba.....................
            ..............abb2bab2b2bba........abababba.....................
            ..............abb2bab2b22ba........abababaa.....................
            ..............abb2bab2bb2ba........aaaaaaaa.....................
            ..............abb2babbaa2aa........aaaaaaaa.....................
            ..............ab22babbbaaaa........aaaaaaaa.....................
            ..............ab2bbabaaaaaa.....................................
            ..............ab2baaaaaaaaa.....................................
            ..............abbbaaaaaaaaa.....................................
            ..............abaaaaaa..........................................
            ..............aaaaaaaa..........................................
            ..............aaaaaaaa..........................................
            `,img`
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            ............................................1..........222......
            .............................................1..........1.......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ......................................22222222223322222222......
            ........................3.............332222222233bb222222......
            .......................222....322.....3b222222bbbbbbbbb22a......
            .......................223...22222....ab22b222bb44bbbb442a......
            ........................1....22232....ab22bb22bb444bb444ba......
            ........................1......1......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            .........................1....1.......abb22bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........222222222222222222222222332ab22bb22bbbb2b2b2bba......
            ...........22222322222222222a2222aa222ab22bb22bb2b2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bbbbbb2b2b2babba......
            ...........a222a22aa222aa322a222aaaabbabbbbbbbbbababababba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aa22aa22aaaa22a22aaaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........a22aaa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba......22223........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba........1..........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaaaaaaaaaaa.......1...........
            ...........a22aa22aa22aaaa22a22aaaaaaaaaaaaaa...22222233........
            ...........a22aaa22a22aaa22aaaaaaaaa223aaaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaa32222aaaaa...a2332222........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...a2222222........
            ...........aaaaaa22aa22aa22aaaaaaaaaaa1aaaaaa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaa33222222aa...a23a233a........
            ...........aaaaa22aaa22a22aaaaaaaaa32222322aa...a22a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa2222332aaa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222222aaa...a22b22ba........
            ...........aaaaaa22a22aaa22aaaaaaaa2222a22aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaaa332a32aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa332a22aaa...ab22b22a........
            ...........aaaaa22aaa22a22aaaaaaaaaa222b22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaab22b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...abbbb33a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...abbbbbba........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaa22b22baaa...abbababa........
            ............aaaaaa...22222233......a22b22ba.....aabababa........
            ...........22222233..33222223......a23b22ba.....aaaaaaaa........
            ...........33222223..a3222222......a33bbbba.....aaaaaaaa........
            ...........a3222222..ab2b222a......abbbbbba.....aaaaaaaa........
            ...........ab22b22a..ab2b2b3a......abababba.....................
            ...........abb2b23a..ab2b2bba......abababaa.....................
            ...........abb2b2ba..ab2b2bba......aaaaaaaa.....................
            ...........abb2b2ba..ab2b2bba......aaaaaaaa.....................
            ...........abb2b2ba..ab2b22ba......aaaaaaaa.....................
            ...........ab22b2ba..ab2bb2ba...................................
            ...........ab2bb2ba..abbaa2aa...................................
            ...........ab2baaaa..abbbaaaa...................................
            ...........abbbaaaa..abaaaaaa...................................
            ...........abaaaaaa..aaaaaaaa...................................
            ...........aaaaaaaa..aaaaaaaa...................................
            ...........aaaaaaaa.............................................
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
        sprites.setDataNumber(E, "T", 5)
        sprites.setDataNumber(E, "HP", 25)
        E.ay = 200
        E.vx = 100
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile46`)) {
        E = sprites.create(assets.tile`myTile46`, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 2 . . . . . 
            . 6 6 6 3 3 3 3 . 2 2 3 . . . . 
            . 6 6 6 6 3 3 3 . 2 2 2 . . . . 
            . 6 f 6 f 6 3 3 . . 1 . . . . . 
            . 6 f 6 6 6 6 6 . . 1 . . . . . 
            . 6 6 6 6 6 6 6 . 1 b . . . . . 
            . 6 3 6 6 6 6 3 2 2 2 3 . . . . 
            . 3 3 6 c 6 6 3 2 2 2 2 . . . . 
            . . . . c 6 3 c 2 c 2 2 . . . . 
            . 3 2 . c c c c c c 2 c . . . . 
            2 2 2 1 d 1 1 1 1 d c c . . . . 
            . 2 2 . c c d c 8 1 c c . . . . 
            . . . . c c c 8 c c c c . . . . 
            . . . . 8 8 8 c c c c c . . . . 
            . . . . c c c c c c c c . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 . . . . . . . . . . 
            . . . . 3 2 2 . 3 3 3 3 6 6 6 . 
            . . . . 2 2 2 . 3 3 3 6 6 6 6 . 
            . . . . . 1 . . 3 3 6 f 6 f 6 . 
            . . . . . 1 . . 6 6 6 6 6 f 6 . 
            . . . . . b 1 . 6 6 6 6 6 6 6 . 
            . . . . 3 2 2 2 3 6 6 6 6 3 6 . 
            . . . . 2 2 2 2 3 6 6 c 6 3 3 . 
            . . . . 2 2 c 2 c 3 6 c . . . . 
            . . . . c 2 c c c c c c . 2 3 . 
            . . . . c c d 1 1 1 1 d 1 2 2 2 
            . . . . c c 1 8 c d c c . 2 2 . 
            . . . . c c c c 8 c c c . . . . 
            . . . . c c c c c 8 8 8 . . . . 
            . . . . c c c c c c c c . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(E, "T", 6)
        sprites.setDataNumber(E, "HP", 4)
        E.ay = 200
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile45`)) {
        E = sprites.create(assets.tile`myTile45`, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . a a a a . . . . . . . . 
            . . . a a a a a a . . . . . . . 
            . . . c c c c a a . . . . . . . 
            . . . b c b c c a . . . . . . . 
            . . . b c c c c a . . . . . . . 
            . . . c c c c a a . . . . . . . 
            . b b a a a a a a b b . . . . . 
            . . b b b a a b b b . . . . . . 
            . . a b b a 8 b b a a . . . . . 
            . . a b b 8 a b b a a . . . . . 
            . . a 8 b a a a b a a . . . . . 
            . . . 8 a a a a a b b . . . . . 
            . . . a a a a a a . . . . . . . 
            . . . a a a a a a . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . a a a a . . . . 
            . . . . . . . a a a a a a . . . 
            . . . . . . . a a c c c c . . . 
            . . . . . . . a c c b c b . . . 
            . . . . . . . a c c c c b . . . 
            . . . . . . . a a c c c c . . . 
            . . . . . b b a a a a a a b b . 
            . . . . . . b b b a a b b b . . 
            . . . . . a a b b 8 a b b a . . 
            . . . . . a a b b a 8 b b a . . 
            . . . . . a a b a a a b 8 a . . 
            . . . . . b b a a a a a 8 . . . 
            . . . . . . . a a a a a a . . . 
            . . . . . . . a a a a a a . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(E, "T", 7)
        sprites.setDataNumber(E, "HP", 8)
        E.vx = 60
        E.ay = 200
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile48`)) {
        E = sprites.create(assets.tile`myTile48`, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . 2 2 3 2 3 3 . . . . . . . 
            . . . 2 3 3 3 2 3 . . . . . . . 
            . . 3 2 2 3 2 2 2 2 . . . . . . 
            . . 3 3 2 2 2 2 2 3 . . . . . . 
            . . . f 1 f d 1 1 . . . . . . . 
            . . . f 1 1 d 1 d . . . . . . . 
            . . . 1 d 1 1 1 1 . . . . . . . 
            . 3 3 1 2 1 1 d 1 2 3 . . . . . 
            . 3 2 2 2 2 1 b 2 2 2 . . . . . 
            . 2 2 2 3 3 8 b b 3 2 . . . . . 
            . 2 2 b b 8 a b b 3 3 . . . . . 
            . . 1 8 b a a a b 1 1 . . . . . 
            . . . 8 a a a a a 1 d . . . . . 
            . . . a a a a a a . . . . . . . 
            . . . a a a a a a . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 3 3 2 3 2 2 . . . 
            . . . . . . . 3 2 3 3 3 2 . . . 
            . . . . . . 2 2 2 2 3 2 2 3 . . 
            . . . . . . 3 2 2 2 2 2 3 3 . . 
            . . . . . . . 1 1 d f 1 f . . . 
            . . . . . . . d 1 d 1 1 f . . . 
            . . . . . . . 1 1 1 1 d 1 . . . 
            . . . . . 3 2 1 d 1 1 2 1 3 3 . 
            . . . . . 2 2 2 b 1 2 2 2 2 3 . 
            . . . . . 2 3 b b 8 3 3 2 2 2 . 
            . . . . . 3 3 b b a 8 b b 2 2 . 
            . . . . . 1 1 b a a a b 8 1 . . 
            . . . . . d 1 a a a a a 8 . . . 
            . . . . . . . a a a a a a . . . 
            . . . . . . . a a a a a a . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(E, "T", 8)
        sprites.setDataNumber(E, "HP", 40)
        E.vx = 60
        E.ay = 200
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile53`)) {
        E = sprites.create(assets.tile`myTile53`, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . 2 2 2 2 2 2 3 2 . . . . . . 
            . 2 2 2 2 2 2 2 2 2 2 . . . . . 
            . 3 2 2 2 2 2 2 2 2 2 . . . . . 
            . . . 1 d 1 1 1 d . . . . . . . 
            . . . f d f 1 1 d . . . . . . . 
            . . . f 1 f d 1 1 . . . . . . . 
            . . . 1 1 1 d 1 1 . . . . . . . 
            . . . d 1 1 1 1 2 3 . . . . . . 
            . . 2 2 2 2 2 2 3 2 . . . . . . 
            . . 2 2 2 2 3 3 2 2 2 . . . . . 
            . . 2 2 3 3 2 2 2 2 2 . . . . . 
            . . 2 3 2 2 2 2 2 2 2 . . . . . 
            . . 1 3 2 2 2 2 2 d 1 . . . . . 
            . . . 2 2 2 2 2 2 . . . . . . . 
            . . . 2 2 2 2 2 2 . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        E,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 3 2 2 2 2 2 2 . . 
            . . . . . 2 2 2 2 2 2 2 2 2 2 . 
            . . . . . 2 2 2 2 2 2 2 2 2 3 . 
            . . . . . . . d 1 1 1 d 1 . . . 
            . . . . . . . d 1 1 f d f . . . 
            . . . . . . . 1 1 d f 1 f . . . 
            . . . . . . . 1 1 d 1 1 1 . . . 
            . . . . . . 3 2 1 1 1 1 d . . . 
            . . . . . . 2 3 2 2 2 2 2 2 . . 
            . . . . . 2 2 2 3 3 2 2 2 2 . . 
            . . . . . 2 2 2 2 2 3 3 2 2 . . 
            . . . . . 2 2 2 2 2 2 2 3 2 . . 
            . . . . . 1 d 2 2 2 2 2 3 1 . . 
            . . . . . . . 2 2 2 2 2 2 . . . 
            . . . . . . . 2 2 2 2 2 2 . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(E, "T", 9)
        sprites.setDataNumber(E, "HP", 6)
        E.vx = 60
        E.ay = 200
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile61`)) {
        E = sprites.create(assets.tile`myTile61`, SpriteKind.Power)
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        sprites.setDataNumber(E, "p", 1)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile62`)) {
        E = sprites.create(assets.tile`myTile62`, SpriteKind.Power)
        tiles.placeOnTile(E, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        sprites.setDataNumber(E, "p", 2)
    }
}
function shoot () {
    if (sprites.readDataBoolean(mySprite, "MULTI")) {
        doSomething3(20, 20)
        doSomething3(-20, -20)
    }
    doSomething3(0, 0)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Power, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.startEffect(effects.bubbles, 500)
    if (sprites.readDataNumber(otherSprite, "p") == 1) {
        sprites.setDataBoolean(sprite, "MULTI", true)
    }
    if (sprites.readDataNumber(otherSprite, "p") == 2) {
        sprites.setDataBoolean(sprite, "RApict", true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    statusbar.value += 10
    sprite.startEffect(effects.bubbles, 500)
})
function All_powers () {
    sprites.setDataBoolean(mySprite, "MULTI", false)
    sprites.setDataBoolean(mySprite, "RApict", false)
}
function doSomething2 (mySprite: Sprite, num: number) {
    if (num == 1) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . a a a a . . . . . . . 
            . . . . a a a a a a . . . . . . 
            . . . . c c c c a a . . . . . . 
            . . . . b c b c c a . . . . . . 
            . . . . b c c c c a . . . . . . 
            . . . . c c c c a a . . . . . . 
            . . . . a a a a a a 8 . . . . . 
            . . . a a a a a a 8 a . . . . . 
            . . . a a a a 8 8 a a a . . . . 
            . . . a a 8 8 a a a a a . . . . 
            . . . a 8 a a a a a a a . . . . 
            . . . . 8 a a a a a b b b . . . 
            . . . . a a a a a a . b . . . . 
            . . . . a a a a a a . b . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . a a a a . . . . . 
            . . . . . . a a a a a a . . . . 
            . . . . . . a a c c c c . . . . 
            . . . . . . a c c b c b . . . . 
            . . . . . . a c c c c b . . . . 
            . . . . . . a a c c c c . . . . 
            . . . . . 8 a a a a a a . . . . 
            . . . . . a 8 a a a a a a . . . 
            . . . . a a a 8 8 a a a a . . . 
            . . . . a a a a a 8 8 a a . . . 
            . . . . a a a a a a a 8 a . . . 
            . . . b b b a a a a a 8 . . . . 
            . . . . b . a a a a a a . . . . 
            . . . . b . a a a a a a . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
    }
    if (num == 2) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . c c c c c c c . . . . . . . . 
            . c a a a a a c . . . . . . . . 
            . c a b a b a c . . b . . . . . 
            . c a b a a a c . b b . . . . . 
            . c a c a a c c c c c c . . . . 
            . c a a a a c c c c c c . . . . 
            . c c c c c c c c c c 8 . . . . 
            . . . . c c c c c c 8 c . . . . 
            . . . b b b b b b b c c . . . . 
            . . . . c c b c 8 b c c . . . . 
            . . . . c c c 8 c c c c . . . . 
            . . . . 8 8 8 c c c c c . . . . 
            . . . . c c c c c c c c . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . c c c c c c c . 
            . . . . . . . . c a a a a a c . 
            . . . . . b . . c a b a b a c . 
            . . . . . b b . c a a a b a c . 
            . . . . c c c c c c a a c a c . 
            . . . . c c c c c c a a a a c . 
            . . . . 8 c c c c c c c c c c . 
            . . . . c 8 c c c c c c . . . . 
            . . . . c c b b b b b b b . . . 
            . . . . c c b 8 c b c c . . . . 
            . . . . c c c c 8 c c c . . . . 
            . . . . c c c c c 8 8 8 . . . . 
            . . . . c c c c c c c c . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
    }
    if (num == 3) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 3 . . . . . . . . 
            . . . . . 6 6 6 3 3 . 2 2 3 . . 
            . . . . . 6 6 6 6 3 2 2 2 2 2 . 
            . . . . . f 6 f 6 3 2 3 2 2 2 . 
            . . . . . f 6 6 6 6 3 . 1 . . . 
            . . . . . 6 6 6 6 8 8 . 1 . . . 
            . . . . . 3 6 6 8 8 3 1 . . . . 
            . . . . 3 3 3 8 8 8 6 3 3 . . . 
            . . . . 3 3 8 8 8 8 8 6 6 . . . 
            . . . . 3 8 8 8 8 8 8 6 6 . . . 
            . . . . 6 8 8 8 8 8 8 6 6 . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 3 6 . . . . . . 
            . . 3 2 2 . 3 3 6 6 6 . . . . . 
            . 2 2 2 2 2 3 6 6 6 6 . . . . . 
            . 2 2 2 3 2 3 6 f 6 f . . . . . 
            . . . 1 . 3 6 6 6 6 f . . . . . 
            . . . 1 . 8 8 6 6 6 6 . . . . . 
            . . . . 1 3 8 8 6 6 3 . . . . . 
            . . . 3 3 6 8 8 8 3 3 3 . . . . 
            . . . 6 6 8 8 8 8 8 3 3 . . . . 
            . . . 6 6 8 8 8 8 8 8 3 . . . . 
            . . . 6 6 8 8 8 8 8 8 6 . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            . . . . . 8 8 8 8 8 8 . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
    }
    if (num == 4) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            ................................
            ..............aaaaaa............
            .............aaccccaa...........
            ............aacaaacca...........
            ......acaaaaaacaacaca...........
            .....aaaccccaacaacaca...........
            ......aaaaaaaacaacaca...........
            .....aaaccccaccacaaca...........
            ......acaaaaccaccccaa...........
            ..............aaaca.............
            ..............aaaca.............
            ..............aaaca.............
            ..............aacaa.............
            ..............aaaca.............
            .........aaaaaaaacaaaaaa........
            .....aaaacccccfffffcccccaaaa....
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            ................................
            ............aaaaaa..............
            ...........aaccccaa.............
            ...........accaaacaa............
            ...........acacaacaaaaaaca......
            ...........acacaacaaccccaaa.....
            ...........acacaacaaaaaaaa......
            ...........acaacaccaccccaaa.....
            ...........aaccccaccaaaaca......
            .............acaaa..............
            .............acaaa..............
            .............acaaa..............
            .............aacaa..............
            .............acaaa..............
            ........aaaaaacaaaaaaaa.........
            ....aaaacccccfffffcccccaaaa.....
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
    }
    if (num == 5) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            ................................................................
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222..........1............................................
            .......1..........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222.............3........................
            ......222222bb332222222233.....223....222.......................
            ......a22bbbbbbbbb222222b3....22222...322.......................
            ......a244bbbb44bb222b22ba....23222....1........................
            ......ab444bb444bb22bb22ba......1......1........................
            ......ab444bb444bb22b222ba.......1....1.........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......ab444bb444b22bb22bba233222222222222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222222...........
            ......abb2b2b2bbbb22bb22ba222aa2222a22222222222322222...........
            ......abb2b2b2b2bb22bb22ba222aaa22aa223322222222a2222...........
            ......abbab2b2b2bbbbbb22babbaaaa222a223aa222aa22a222a...........
            ......abbababababbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaaa22a22aaaa22aa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaa22aaa22aaa22a22aaa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ........32222......abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22aa22a...........
            ...........1.......aaaaaa322aaaaa22a22aaaa22aa22aa22a...........
            ........33222222...aaaaa22223aaaaaaaa22aaa22a22aaa22a...........
            ........32222322...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222332a...aaaaaa1aaaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aa22222233aaaaaaaa22aa22aa22aaaaaa...........
            ........2222a22a...aa22322223aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a32a...aaa2332222aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aaa2222222aaaaaaaaa22aa22aa22aaaaa...........
            ........a222b22a...aaa22a2222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa23a233aaaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a233aaaaaaaaa22aa22aa22aaaaaa...........
            ........ab22b22a...aaa22b222aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b22baaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b22baaaaaaaaaa22aaaaaa22aaaaa...........
            ........a23b22ba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........a33bbbba...aaab22b22aaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaab22b22aaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abababba.....ab22b32a......aaaaaa.....aaaaaa............
            ........abababaa.....abbbb33a.....33222222...33222222...........
            ........aaaaaaaa.....abbbbbba.....32222233...32222233...........
            ........aaaaaaaa.....abbababa.....2222223a...2222223a...........
            ........aaaaaaaa.....aabababa.....a222b2ba...a22b22ba...........
            .....................aaaaaaaa.....a3b2b2ba...a32b2bba...........
            .....................aaaaaaaa.....abb2b2ba...ab2b2bba...........
            .....................aaaaaaaa.....abb2b2ba...ab2b2bba...........
            ..................................abb2b2ba...ab2b2bba...........
            ..................................ab22b2ba...ab2b22ba...........
            ..................................ab2bb2ba...ab2bb2ba...........
            ..................................aa2aabba...aaaab2ba...........
            ..................................aaaabbba...aaaabbba...........
            ..................................aaaaaaba...aaaaaaba...........
            ..................................aaaaaaaa...aaaaaaaa...........
            ..................................aaaaaaaa...aaaaaaaa...........
            `,img`
            ................................................................
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222.........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222......................................
            ......222222bb332222222233.............3........................
            ......a22bbbbbbbbb222222b3.....223....222.......................
            ......a244bbbb44bb222b22ba....22222...322.......................
            ......ab444bb444bb22bb22ba....23222....1........................
            ......ab444bb444bb22b222ba......1......1........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222332...........
            ......abb2b2b2bbbb22bb22ba233222222222222222222222222...........
            ......abb2b2b2b2bb22bb22ba222aa2222a22222222222322222...........
            ......abbab2b2b2bbbbbb22ba222aaa22aa223322222222a2222...........
            ......abbababababbbbbbbbbabbaaaa222a223aa222aa22a222a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaaa22a22aaaa22aa22aa22a...........
            ...................abbbbbbbbbaaa22aaa22aaa22a22aaa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ........32222......abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ..........1........aaaaaa322aaaaa22a22aaa22aaa22aa22a...........
            ...........1.......aaaaa22223aaaa22a22aaaa22aa22aa22a...........
            ........33222222...aaaaaaa1aaaaaaaaaa22aaa22a22aaa22a...........
            ........32222322...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222332a...aaaaaa1aaaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aa22222233aaaaaaaa22aa22aa22aaaaaa...........
            ........2222a22a...aa22322223aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a32a...aaa2332222aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aaa2222222aaaaaaaaa22aa22aa22aaaaa...........
            ........a222b22a...aaa22a2222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa23a233aaaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a233aaaaaaaaa22aa22aa22aaaaaa...........
            ........ab22b22a...aaa22b222aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b22baaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b22baaaaaaaaaa22aaaaaa22aaaaa...........
            ........a23b22ba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........a33bbbba...aaab22b22aaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaab22b22aaaaaaaaaaaaaaa3aaaaaa2aa...........
            ........abababba.....ab22b32a......aaaaaa..33222222.............
            ........abababaa.....abbbb33a.....33222222.32222233.............
            ........aaaaaaaa.....abbbbbba.....32222233.2222223a.............
            ........aaaaaaaa.....abbababa.....2222223a.a22b22ba.............
            ........aaaaaaaa.....aabababa.....a222b2ba.a32b2bba.............
            .....................aaaaaaaa.....a3b2b2ba.ab2b2bba.............
            .....................aaaaaaaa.....abb2b2ba.ab2b2bba.............
            .....................aaaaaaaa.....abb2b2ba.ab2b2bba.............
            ..................................abb2b2ba.ab2b22ba.............
            ..................................ab22b2ba.ab2bb2ba.............
            ..................................ab2bb2ba.aaaab2ba.............
            ..................................aa2aabba.aaaabbba.............
            ..................................aaaabbba.aaaaaaba.............
            ..................................aaaaaaba.aaaaaaaa.............
            ..................................aaaaaaaa......................
            ..................................aaaaaaaa......................
            `,img`
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222..........1............................................
            .......1..........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222......................................
            ......222222bb332222222233.............3........................
            ......a22bbbbbbbbb222222b3.....223....222.......................
            ......a244bbbb44bb222b22ba....22222...322.......................
            ......ab444bb444bb22bb22ba....23222....1........................
            ......ab444bb444bb22b222ba......1......1........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222332...........
            ......abb2b2b2bbbb22bb22ba233222222222222222222222222...........
            ......abb2b2b2b2bb22bb22ba222aa2222a22222222222322222...........
            ......abbab2b2b2bbbbbb22ba222aaa22aa223322222222a2222...........
            ......abbababababbbbbbbbbabbaaaa222a223aa222aa22a222a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaaa22a22aaaa22aa22aa22a...........
            ...................abbbbbbbbbaaa22aaa22aaa22a22aaa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ........32222......abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ...........1.......aaaaaaaaaaaaaa22a22aaa22aaa22aa22a...........
            ........33222222...aaaaaa322aaaaa22a22aaaa22aa22aa22a...........
            ........32222322...aaaaa22223aaaaaaaa22aaa22a22aaa22a...........
            ........2222332a...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222a22a...aaaaaa1aaaaaaaaaaa22aa22aa22aaaaaa...........
            ........a332a32a...aa22222233aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aa22322223aaaaaaaaa22a22aaa22aaaaa...........
            ........a222b22a...aaa2332222aaaaaaaaa22aa22aa22aaaaa...........
            ........ab22b22a...aaa2222222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a2222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa23a233aaaaaaaaa22aa22aa22aaaaaa...........
            ........a22b22ba...aaa22a233aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b222aaaaaaaaaa22a22aaa22aaaaa...........
            ........a23b22ba...aaa22b22baaaaaaaaaa22aaaaaa22aaaaa...........
            ........a33bbbba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaa22b22baaaaaaaaaaaaaa22222233aaa...........
            ........abababba...aaab22b22aaaaaaaaaaaaaa33222223aaa...........
            ........abababaa.....ab22b22a..........aaaa3222222..............
            ........aaaaaaaa.....ab22b32a..........aaaab2b222a..............
            ........aaaaaaaa.....abbbb33a.........2222ab2b2b3a..............
            ........aaaaaaaa.....abbbbbba.........3322ab2b2bba..............
            .....................abbababa.........a322ab2b2bba..............
            .....................aabababa.........ab22ab2b2bba..............
            .....................aaaaaaaa.........abb2ab2b22ba..............
            .....................aaaaaaaa.........abb2ab2bb2ba..............
            .....................aaaaaaaa.........abb2abbaa2aa..............
            ......................................abb2abbbaaaa..............
            ......................................ab22abaaaaaa..............
            ......................................ab2baaaaaaaa..............
            ......................................ab2baaaaaaaa..............
            ......................................abbbaaaa..................
            ......................................abaaaaaa..................
            ......................................aaaaaaaa..................
            `,img`
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222..........1............................................
            .......1..........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222......................................
            ......222222bb332222222233.............3........................
            ......a22bbbbbbbbb222222b3.....223....222.......................
            ......a244bbbb44bb222b22ba....22222...322.......................
            ......ab444bb444bb22bb22ba....23222....1........................
            ......ab444bb444bb22b222ba......1......1........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222332...........
            ......abb2b2b2bbbb22bb22ba233222222222222222222222222...........
            ......abb2b2b2b2bb22bb22ba222aa2222a22222222222322222...........
            ......abbab2b2b2bbbbbb22ba222aaa22aa223322222222a2222...........
            ......abbababababbbbbbbbbabbaaaa222a223aa222aa22a222a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaaa22a22aaaa22aa22aa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aaa22a...........
            ........32222......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ..........1........abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ...........1.......aaaaaaaaaaaaaa22a22aaa22aaa22aa22a...........
            ........33222222...aaaaaaaaaaaaaa22a22aaaa22aa22aa22a...........
            ........32222322...aaaaaa322aaaaaaaaa22aaa22a22aaa22a...........
            ........2222332a...aaaaa22223aaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222a22a...aaaaaaa1aaaaaaaaaa22aa22aa22aaaaaa...........
            ........a332a32a...aaaaaa1aaaaaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aa22222233aaaaaaaaa22a22aaa22aaaaa...........
            ........a222b22a...aa22322223aaaaaaaaa22aa22aa22aaaaa...........
            ........ab22b22a...aaa2332222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa2222222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a2222aaaaaaaa22aa22aa22aaaaaa...........
            ........a22b22ba...aaa23a233aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22a233aaaaaaaaaa22a22aaa22aaaaa...........
            ........a23b22ba...aaa22b222aaaaaaaaaa22aaaaaa22aaaaa...........
            ........a33bbbba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaa22b22baaaaaaaaa33222222aaaaaaaa...........
            ........abababba...aaa22b22baaaaaaaaa32222233aaaaaaaa...........
            ........abababaa.....ab22b22a........2222223aaaaa...............
            ........aaaaaaaa.....ab22b22a........a222b2ba22222..............
            ........aaaaaaaa.....ab22b32a........a3b2b2ba22233..............
            ........aaaaaaaa.....abbbb33a........abb2b2ba2223a..............
            .....................abbbbbba........abb2b2bab22ba..............
            .....................abbababa........abb2b2bab2bba..............
            .....................aabababa........ab22b2bab2bba..............
            .....................aaaaaaaa........ab2bb2bab2bba..............
            .....................aaaaaaaa........aa2aabbab2bba..............
            .....................aaaaaaaa........aaaabbbab22ba..............
            .....................................aaaaaababb2ba..............
            .....................................aaaaaaaaab2ba..............
            .....................................aaaaaaaaabbba..............
            ..........................................aaaaaaba..............
            ..........................................aaaaaaaa..............
            ..........................................aaaaaaaa..............
            `,img`
            ................................................................
            ..................322...........................................
            .......2..........222...........................................
            ......322........22232..........................................
            ......222..........1............................................
            .......1..........1.............................................
            .......1..........1.............................................
            ......22222222233222222233......................................
            ......23322222222222222233......................................
            ......23322222222222222222......................................
            ......22222222332222222222......................................
            ......222222bb332222222233.............3........................
            ......a22bbbbbbbbb222222b3.....223....222.......................
            ......a244bbbb44bb222b22ba....22222...322.......................
            ......ab444bb444bb22bb22ba....23222....1........................
            ......ab444bb444bb22b222ba......1......1........................
            ......ab444bb444b22bb222ba.......1....1.........................
            ......ab444bb444b22bb22bba.......1....1.........................
            ......ab444bb444b22bb22bba222222222322222222222222332...........
            ......abbbbbbbbbb22bb222ba233222222222222222222222332...........
            ......abb2b2b2bbbb22bb22ba233222222222222222222222222...........
            ......abb2b2b2b2bb22bb22ba222aa2222a22222222222322222...........
            ......abbab2b2b2bbbbbb22ba222aaa22aa223322222222a2222...........
            ......abbababababbbbbbbbbabbaaaa222a223aa222aa22a222a...........
            ......abbbbbbbbbbbbbbbbbbabbbaaa222a22aaa22aaa22aa22a...........
            ......aaaaaaaaaaaaaaaaaaaabbbaaaa22a22aaaa22aa22aa22a...........
            .........223.......abbbbbbbbbaaa22aaa22aaa22a22aaa22a...........
            ........32222......abbbbbbbbbaaa22aaa22aaa22a22aa22aa...........
            ..........1........abbbbbbbbaaaa22aaa22aa22aa22aa22aa...........
            ..........1........aaaaaaaaaaaaaa22a22aaa22aaa22a22aa...........
            ...........1.......aaaaaaaaaaaaaa22a22aaa22aaa22aa22a...........
            ........33222222...aaaaaaaaaaaaaa22a22aaaa22aa22aa22a...........
            ........32222322...aaaaaa322aaaaaaaaa22aaa22a22aaa22a...........
            ........2222332a...aaaaa22223aaaaaaaa22aaa22a22aaaaaa...........
            ........2222222a...aaaaaaa1aaaaaaaaaa22aaa22a22aaaaaa...........
            ........2222a22a...aaaaaa1aaaaaaaaaaa22aa22aa22aaaaaa...........
            ........a332a32a...aa22222233aaaaaaaaa22a22aaa22aaaaa...........
            ........a332a22a...aa22322223aaaaaaaaa22a22aaa22aaaaa...........
            ........a222b22a...aaa2332222aaaaaaaaa22aa22aa22aaaaa...........
            ........ab22b22a...aaa2222222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa22a2222aaaaaaaa22aaa22a22aaaaaa...........
            ........ab22b22a...aaa23a233aaaaaaaaa22aa22aa22aaaaaa...........
            ........a22b22ba...aaa22a233aaaaaaaaaa22a22aaa22aaaaa...........
            ........a22b22ba...aaa22b222aaaaaaaaaa22a22aaa22aaaaa...........
            ........a23b22ba...aaa22b22baaaaaaaaaa22aaaaaa22aaaaa...........
            ........a33bbbba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abbbbbba...aaa22b22baaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abababba...aaab22b22aaaaaaaaaaaaaaaaaaaaaaaaa...........
            ........abababaa.....ab22b22a......33222222...aaaaaa............
            ........aaaaaaaa.....ab22b32a......32222233..33222222...........
            ........aaaaaaaa.....abbbb33a......2222223a..32222233...........
            ........aaaaaaaa.....abbbbbba......a222b2ba..2222223a...........
            .....................abbababa......a3b2b2ba..a22b22ba...........
            .....................aabababa......abb2b2ba..a32b2bba...........
            .....................aaaaaaaa......abb2b2ba..ab2b2bba...........
            .....................aaaaaaaa......abb2b2ba..ab2b2bba...........
            .....................aaaaaaaa......ab22b2ba..ab2b2bba...........
            ...................................ab2bb2ba..ab2b22ba...........
            ...................................aa2aabba..ab2bb2ba...........
            ...................................aaaabbba..aaaab2ba...........
            ...................................aaaaaaba..aaaabbba...........
            ...................................aaaaaaaa..aaaaaaba...........
            ...................................aaaaaaaa..aaaaaaaa...........
            .............................................aaaaaaaa...........
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            ................................................................
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            ............................................1..........222......
            .............................................1..........1.......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ........................3.............22222222223322222222......
            .......................222....322.....332222222233bb222222......
            .......................223...22222....3b222222bbbbbbbbb22a......
            ........................1....22232....ab22b222bb44bbbb442a......
            ........................1......1......ab22bb22bb444bb444ba......
            .........................1....1.......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332abb22bb22b444bb444ba......
            ...........222222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........22222322222222222a2222aa222ab22bb22bbbb2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bb22bb2b2b2b2bba......
            ...........a222a22aa222aa322a222aaaabbab22bbbbbb2b2b2babba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbababababba......
            ...........a22aa22aa22aaaa22a22aaaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aaa22a22aaa22aaa22aaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba......22223........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aa22aaaa22a22aaaaa223aaaaaa.......1...........
            ...........a22aaa22a22aaa22aaaaaaaa32222aaaaa...22222233........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaaaaa1aaaaaa...a2332222........
            ...........aaaaaa22aa22aa22aaaaaaaa33222222aa...a2222222........
            ...........aaaaa22aaa22a22aaaaaaaaa32222322aa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaa2222332aaa...a23a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa2222222aaa...a22a233a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222a22aaa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaaa332a32aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaaa332a22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa222b22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaab22b22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaab22b22aaa...ab22b22a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaa22b22baaa...abbbb33a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaa22b22baaa...abbbbbba........
            ............aaaaaa.....aaaaaa......a23b22ba.....abbababa........
            ...........22222233...22222233.....a33bbbba.....aabababa........
            ...........33222223...33222223.....abbbbbba.....aaaaaaaa........
            ...........a3222222...a3222222.....abababba.....aaaaaaaa........
            ...........ab22b22a...ab2b222a.....abababaa.....aaaaaaaa........
            ...........abb2b23a...ab2b2b3a.....aaaaaaaa.....................
            ...........abb2b2ba...ab2b2bba.....aaaaaaaa.....................
            ...........abb2b2ba...ab2b2bba.....aaaaaaaa.....................
            ...........abb2b2ba...ab2b2bba..................................
            ...........ab22b2ba...ab2b22ba..................................
            ...........ab2bb2ba...ab2bb2ba..................................
            ...........ab2baaaa...abbaa2aa..................................
            ...........abbbaaaa...abbbaaaa..................................
            ...........abaaaaaa...abaaaaaa..................................
            ...........aaaaaaaa...aaaaaaaa..................................
            ...........aaaaaaaa...aaaaaaaa..................................
            `,img`
            ................................................................
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            .............................................1.........222......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ......................................22222222223322222222......
            ........................3.............332222222233bb222222......
            .......................222....322.....3b222222bbbbbbbbb22a......
            .......................223...22222....ab22b222bb44bbbb442a......
            ........................1....22232....ab22bb22bb444bb444ba......
            ........................1......1......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            .........................1....1.......abb22bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........222222222222222222222222332ab22bb22bbbb2b2b2bba......
            ...........22222322222222222a2222aa222ab22bb22bb2b2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bbbbbb2b2b2babba......
            ...........a222a22aa222aa322a222aaaabbabbbbbbbbbababababba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aa22aa22aaaa22a22aaaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........a22aaa22a22aaa22aaa22aaabbbbbbbbba...................
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba......22223........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaa223aaaaaa........1..........
            ...........a22aa22aa22aaaa22a22aaaa32222aaaaa.......1...........
            ...........a22aaa22a22aaa22aaaaaaaaaa1aaaaaaa...22222233........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaaaaa1aaaaaa...a2332222........
            ...........aaaaaa22aa22aa22aaaaaaaa33222222aa...a2222222........
            ...........aaaaa22aaa22a22aaaaaaaaa32222322aa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaa2222332aaa...a23a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa2222222aaa...a22a233a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222a22aaa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaaa332a32aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaaa332a22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa222b22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaab22b22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaab22b22aaa...ab22b22a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaa22b22baaa...abbbb33a........
            ...........aa2aaaaaa3aaaaaaaaaaaaaaa22b22baaa...abbbbbba........
            .............22222233..aaaaaa......a23b22ba.....abbababa........
            .............33222223.22222233.....a33bbbba.....aabababa........
            .............a3222222.33222223.....abbbbbba.....aaaaaaaa........
            .............ab22b22a.a3222222.....abababba.....aaaaaaaa........
            .............abb2b23a.ab2b222a.....abababaa.....aaaaaaaa........
            .............abb2b2ba.ab2b2b3a.....aaaaaaaa.....................
            .............abb2b2ba.ab2b2bba.....aaaaaaaa.....................
            .............abb2b2ba.ab2b2bba.....aaaaaaaa.....................
            .............ab22b2ba.ab2b2bba..................................
            .............ab2bb2ba.ab2b22ba..................................
            .............ab2baaaa.ab2bb2ba..................................
            .............abbbaaaa.abbaa2aa..................................
            .............abaaaaaa.abbbaaaa..................................
            .............aaaaaaaa.abaaaaaa..................................
            ......................aaaaaaaa..................................
            ......................aaaaaaaa..................................
            `,img`
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            ............................................1..........222......
            .............................................1..........1.......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ......................................22222222223322222222......
            ........................3.............332222222233bb222222......
            .......................222....322.....3b222222bbbbbbbbb22a......
            .......................223...22222....ab22b222bb44bbbb442a......
            ........................1....22232....ab22bb22bb444bb444ba......
            ........................1......1......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            .........................1....1.......abb22bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........222222222222222222222222332ab22bb22bbbb2b2b2bba......
            ...........22222322222222222a2222aa222ab22bb22bb2b2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bbbbbb2b2b2babba......
            ...........a222a22aa222aa322a222aaaabbabbbbbbbbbababababba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aa22aa22aaaa22a22aaaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........a22aaa22a22aaa22aaa22aaabbbbbbbbba...................
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba......22223........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaaaaaaaaaaa.......1...........
            ...........a22aa22aa22aaaa22a22aaaaa223aaaaaa...22222233........
            ...........a22aaa22a22aaa22aaaaaaaa32222aaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...a2332222........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...a2222222........
            ...........aaaaaa22aa22aa22aaaaaaaaaaa1aaaaaa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaa33222222aa...a23a233a........
            ...........aaaaa22aaa22a22aaaaaaaaa32222322aa...a22a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa2222332aaa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222222aaa...a22b22ba........
            ...........aaaaaa22a22aaa22aaaaaaaa2222a22aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaaa332a32aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa332a22aaa...ab22b22a........
            ...........aaaaa22aaa22a22aaaaaaaaaa222b22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaab22b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...abbbb33a........
            ...........aaa33222222aaaaaaaaaaaaaab22b22aaa...abbbbbba........
            ...........aaa32222233aaaaaaaaaaaaaa22b22baaa...abbababa........
            ..............2222223aaaa..........a22b22ba.....aabababa........
            ..............a222b2baaaa..........a23b22ba.....aaaaaaaa........
            ..............a3b2b2ba2222.........a33bbbba.....aaaaaaaa........
            ..............abb2b2ba2233.........abbbbbba.....aaaaaaaa........
            ..............abb2b2ba223a.........abababba.....................
            ..............abb2b2ba22ba.........abababaa.....................
            ..............ab22b2ba2bba.........aaaaaaaa.....................
            ..............ab2bb2ba2bba.........aaaaaaaa.....................
            ..............aa2aabba2bba.........aaaaaaaa.....................
            ..............aaaabbba2bba......................................
            ..............aaaaaaba22ba......................................
            ..............aaaaaaaab2ba......................................
            ..............aaaaaaaab2ba......................................
            ..................aaaabbba......................................
            ..................aaaaaaba......................................
            ..................aaaaaaaa......................................
            `,img`
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            ............................................1..........222......
            .............................................1..........1.......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ......................................22222222223322222222......
            ........................3.............332222222233bb222222......
            .......................222....322.....3b222222bbbbbbbbb22a......
            .......................223...22222....ab22b222bb44bbbb442a......
            ........................1....22232....ab22bb22bb444bb444ba......
            ........................1......1......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            .........................1....1.......abb22bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........222222222222222222222222332ab22bb22bbbb2b2b2bba......
            ...........22222322222222222a2222aa222ab22bb22bb2b2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bbbbbb2b2b2babba......
            ...........a222a22aa222aa322a222aaaabbabbbbbbbbbababababba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aa22aa22aaaa22a22aaaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........a22aaa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba......22223........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba........1..........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaaaaaaaaaaa.......1...........
            ...........a22aa22aa22aaaa22a22aaaaaaaaaaaaaa...22222233........
            ...........a22aaa22a22aaa22aaaaaaaaa223aaaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaa32222aaaaa...a2332222........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...a2222222........
            ...........aaaaaa22aa22aa22aaaaaaaaaa1aaaaaaa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaaaaa1aaaaaa...a23a233a........
            ...........aaaaa22aaa22a22aaaaaaaaa33222222aa...a22a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa32222322aa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222332aaa...a22b22ba........
            ...........aaaaaa22a22aaa22aaaaaaaa2222222aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaa2222a22aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa332a32aaa...ab22b22a........
            ...........aaaaa22aaa22a22aaaaaaaaaa332a22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaa222b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...abbbb33a........
            ...........aaaaaaaa22222233aaaaaaaaab22b22aaa...abbbbbba........
            ...........aaaaaaaa33222223aaaaaaaaab22b22aaa...abbababa........
            ...............aaaaa3222222........a22b22ba.....aabababa........
            ..............22222ab2b222a........a22b22ba.....aaaaaaaa........
            ..............33222ab2b2b3a........a23b22ba.....aaaaaaaa........
            ..............a3222ab2b2bba........a33bbbba.....aaaaaaaa........
            ..............ab22bab2b2bba........abbbbbba.....................
            ..............abb2bab2b2bba........abababba.....................
            ..............abb2bab2b22ba........abababaa.....................
            ..............abb2bab2bb2ba........aaaaaaaa.....................
            ..............abb2babbaa2aa........aaaaaaaa.....................
            ..............ab22babbbaaaa........aaaaaaaa.....................
            ..............ab2bbabaaaaaa.....................................
            ..............ab2baaaaaaaaa.....................................
            ..............abbbaaaaaaaaa.....................................
            ..............abaaaaaa..........................................
            ..............aaaaaaaa..........................................
            ..............aaaaaaaa..........................................
            `,img`
            ................................................................
            ...........................................223..................
            ...........................................222..........2.......
            ..........................................23222........223......
            ............................................1..........222......
            .............................................1..........1.......
            .............................................1..........1.......
            ......................................33222222233222222222......
            ......................................33222222222222222332......
            ......................................22222222222222222332......
            ......................................22222222223322222222......
            ........................3.............332222222233bb222222......
            .......................222....322.....3b222222bbbbbbbbb22a......
            .......................223...22222....ab22b222bb44bbbb442a......
            ........................1....22232....ab22bb22bb444bb444ba......
            ........................1......1......ab222b22bb444bb444ba......
            .........................1....1.......ab222bb22b444bb444ba......
            .........................1....1.......abb22bb22b444bb444ba......
            ...........233222222222222223222222222abb22bb22b444bb444ba......
            ...........233222222222222222222222332ab222bb22bbbbbbbbbba......
            ...........222222222222222222222222332ab22bb22bbbb2b2b2bba......
            ...........22222322222222222a2222aa222ab22bb22bb2b2b2b2bba......
            ...........2222a222222223322aa22aaa222ab22bbbbbb2b2b2babba......
            ...........a222a22aa222aa322a222aaaabbabbbbbbbbbababababba......
            ...........a22aa22aaa22aaa22a222aaabbbabbbbbbbbbbbbbbbbbba......
            ...........a22aa22aa22aaaa22a22aaaabbbaaaaaaaaaaaaaaaaaaaa......
            ...........a22aaa22a22aaa22aaa22aaabbbbbbbbba.......322.........
            ...........aa22aa22a22aaa22aaa22aaabbbbbbbbba......22223........
            ...........aa22aa22aa22aa22aaa22aaaabbbbbbbba........1..........
            ...........aa22a22aaa22aaa22a22aaaaaaaaaaaaaa........1..........
            ...........a22aa22aaa22aaa22a22aaaaaaaaaaaaaa.......1...........
            ...........a22aa22aa22aaaa22a22aaaaaaaaaaaaaa...22222233........
            ...........a22aaa22a22aaa22aaaaaaaaa223aaaaaa...22322223........
            ...........aaaaaa22a22aaa22aaaaaaaa32222aaaaa...a2332222........
            ...........aaaaaa22a22aaa22aaaaaaaaaa1aaaaaaa...a2222222........
            ...........aaaaaa22aa22aa22aaaaaaaaaaa1aaaaaa...a22a2222........
            ...........aaaaa22aaa22a22aaaaaaaaa33222222aa...a23a233a........
            ...........aaaaa22aaa22a22aaaaaaaaa32222322aa...a22a233a........
            ...........aaaaa22aa22aa22aaaaaaaaa2222332aaa...a22b222a........
            ...........aaaaaa22a22aaa22aaaaaaaa2222222aaa...a22b22ba........
            ...........aaaaaa22a22aaa22aaaaaaaa2222a22aaa...a22b22ba........
            ...........aaaaaa22aa22aa22aaaaaaaaa332a32aaa...a22b22ba........
            ...........aaaaa22aaa22a22aaaaaaaaaa332a22aaa...ab22b22a........
            ...........aaaaa22aaa22a22aaaaaaaaaa222b22aaa...ab22b22a........
            ...........aaaaa22aaaaaa22aaaaaaaaaab22b22aaa...ab22b32a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...abbbb33a........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaab22b22aaa...abbbbbba........
            ...........aaaaaaaaaaaaaaaaaaaaaaaaa22b22baaa...abbababa........
            ............aaaaaa...22222233......a22b22ba.....aabababa........
            ...........22222233..33222223......a23b22ba.....aaaaaaaa........
            ...........33222223..a3222222......a33bbbba.....aaaaaaaa........
            ...........a3222222..ab2b222a......abbbbbba.....aaaaaaaa........
            ...........ab22b22a..ab2b2b3a......abababba.....................
            ...........abb2b23a..ab2b2bba......abababaa.....................
            ...........abb2b2ba..ab2b2bba......aaaaaaaa.....................
            ...........abb2b2ba..ab2b2bba......aaaaaaaa.....................
            ...........abb2b2ba..ab2b22ba......aaaaaaaa.....................
            ...........ab22b2ba..ab2bb2ba...................................
            ...........ab2bb2ba..abbaa2aa...................................
            ...........ab2baaaa..abbbaaaa...................................
            ...........abbbaaaa..abaaaaaa...................................
            ...........abaaaaaa..aaaaaaaa...................................
            ...........aaaaaaaa..aaaaaaaa...................................
            ...........aaaaaaaa.............................................
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
    }
    if (num == 6) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 2 . . . . . 
            . 6 6 6 3 3 3 3 . 2 2 3 . . . . 
            . 6 6 6 6 3 3 3 . 2 2 2 . . . . 
            . 6 f 6 f 6 3 3 . . 1 . . . . . 
            . 6 f 6 6 6 6 6 . . 1 . . . . . 
            . 6 6 6 6 6 6 6 . 1 b . . . . . 
            . 6 3 6 6 6 6 3 2 2 2 3 . . . . 
            . 3 3 6 c 6 6 3 2 2 2 2 . . . . 
            . . . . c 6 3 c 2 c 2 2 . . . . 
            . 3 2 . c c c c c c 2 c . . . . 
            2 2 2 1 d 1 1 1 1 d c c . . . . 
            . 2 2 . c c d c 8 1 c c . . . . 
            . . . . c c c 8 c c c c . . . . 
            . . . . 8 8 8 c c c c c . . . . 
            . . . . c c c c c c c c . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 . . . . . . . . . . 
            . . . . 3 2 2 . 3 3 3 3 6 6 6 . 
            . . . . 2 2 2 . 3 3 3 6 6 6 6 . 
            . . . . . 1 . . 3 3 6 f 6 f 6 . 
            . . . . . 1 . . 6 6 6 6 6 f 6 . 
            . . . . . b 1 . 6 6 6 6 6 6 6 . 
            . . . . 3 2 2 2 3 6 6 6 6 3 6 . 
            . . . . 2 2 2 2 3 6 6 c 6 3 3 . 
            . . . . 2 2 c 2 c 3 6 c . . . . 
            . . . . c 2 c c c c c c . 2 3 . 
            . . . . c c d 1 1 1 1 d 1 2 2 2 
            . . . . c c 1 8 c d c c . 2 2 . 
            . . . . c c c c 8 c c c . . . . 
            . . . . c c c c c 8 8 8 . . . . 
            . . . . c c c c c c c c . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
    }
    if (num == 7) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . a a a a . . . . . . . . 
            . . . a a a a a a . . . . . . . 
            . . . c c c c a a . . . . . . . 
            . . . b c b c c a . . . . . . . 
            . . . b c c c c a . . . . . . . 
            . . . c c c c a a . . . . . . . 
            . b b a a a a a a b b . . . . . 
            . . b b b a a b b b . . . . . . 
            . . a b b a 8 b b a a . . . . . 
            . . a b b 8 a b b a a . . . . . 
            . . a 8 b a a a b a a . . . . . 
            . . . 8 a a a a a b b . . . . . 
            . . . a a a a a a . . . . . . . 
            . . . a a a a a a . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . a a a a . . . . 
            . . . . . . . a a a a a a . . . 
            . . . . . . . a a c c c c . . . 
            . . . . . . . a c c b c b . . . 
            . . . . . . . a c c c c b . . . 
            . . . . . . . a a c c c c . . . 
            . . . . . b b a a a a a a b b . 
            . . . . . . b b b a a b b b . . 
            . . . . . a a b b 8 a b b a . . 
            . . . . . a a b b a 8 b b a . . 
            . . . . . a a b a a a b 8 a . . 
            . . . . . b b a a a a a 8 . . . 
            . . . . . . . a a a a a a . . . 
            . . . . . . . a a a a a a . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
    }
    if (num == 8) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . 2 2 3 2 3 3 . . . . . . . 
            . . . 2 3 3 3 2 3 . . . . . . . 
            . . 3 2 2 3 2 2 2 2 . . . . . . 
            . . 3 3 2 2 2 2 2 3 . . . . . . 
            . . . f 1 f d 1 1 . . . . . . . 
            . . . f 1 1 d 1 d . . . . . . . 
            . . . 1 d 1 1 1 1 . . . . . . . 
            . 3 3 1 2 1 1 d 1 2 3 . . . . . 
            . 3 2 2 2 2 1 b 2 2 2 . . . . . 
            . 2 2 2 3 3 8 b b 3 2 . . . . . 
            . 2 2 b b 8 a b b 3 3 . . . . . 
            . . 1 8 b a a a b 1 1 . . . . . 
            . . . 8 a a a a a 1 d . . . . . 
            . . . a a a a a a . . . . . . . 
            . . . a a a a a a . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 3 3 2 3 2 2 . . . 
            . . . . . . . 3 2 3 3 3 2 . . . 
            . . . . . . 2 2 2 2 3 2 2 3 . . 
            . . . . . . 3 2 2 2 2 2 3 3 . . 
            . . . . . . . 1 1 d f 1 f . . . 
            . . . . . . . d 1 d 1 1 f . . . 
            . . . . . . . 1 1 1 1 d 1 . . . 
            . . . . . 3 2 1 d 1 1 2 1 3 3 . 
            . . . . . 2 2 2 b 1 2 2 2 2 3 . 
            . . . . . 2 3 b b 8 3 3 2 2 2 . 
            . . . . . 3 3 b b a 8 b b 2 2 . 
            . . . . . 1 1 b a a a b 8 1 . . 
            . . . . . d 1 a a a a a 8 . . . 
            . . . . . . . a a a a a a . . . 
            . . . . . . . a a a a a a . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
    }
    if (num == 9) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . 2 2 2 2 2 2 3 2 . . . . . . 
            . 2 2 2 2 2 2 2 2 2 2 . . . . . 
            . 3 2 2 2 2 2 2 2 2 2 . . . . . 
            . . . 1 d 1 1 1 d . . . . . . . 
            . . . f d f 1 1 d . . . . . . . 
            . . . f 1 f d 1 1 . . . . . . . 
            . . . 1 1 1 d 1 1 . . . . . . . 
            . . . d 1 1 1 1 2 3 . . . . . . 
            . . 2 2 2 2 2 2 3 2 . . . . . . 
            . . 2 2 2 2 3 3 2 2 2 . . . . . 
            . . 2 2 3 3 2 2 2 2 2 . . . . . 
            . . 2 3 2 2 2 2 2 2 2 . . . . . 
            . . 1 3 2 2 2 2 2 d 1 . . . . . 
            . . . 2 2 2 2 2 2 . . . . . . . 
            . . . 2 2 2 2 2 2 . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 3 2 2 2 2 2 2 . . 
            . . . . . 2 2 2 2 2 2 2 2 2 2 . 
            . . . . . 2 2 2 2 2 2 2 2 2 3 . 
            . . . . . . . d 1 1 1 d 1 . . . 
            . . . . . . . d 1 1 f d f . . . 
            . . . . . . . 1 1 d f 1 f . . . 
            . . . . . . . 1 1 d 1 1 1 . . . 
            . . . . . . 3 2 1 1 1 1 d . . . 
            . . . . . . 2 3 2 2 2 2 2 2 . . 
            . . . . . 2 2 2 3 3 2 2 2 2 . . 
            . . . . . 2 2 2 2 2 3 3 2 2 . . 
            . . . . . 2 2 2 2 2 2 2 3 2 . . 
            . . . . . 1 d 2 2 2 2 2 3 1 . . 
            . . . . . . . 2 2 2 2 2 2 . . . 
            . . . . . . . 2 2 2 2 2 2 . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
    }
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    statusbar.value += -1
    timer.after(100, function () {
        otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EFIRE, function (sprite, otherSprite) {
    statusbar.value += -1
    otherSprite.destroy()
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    timer.after(100, function () {
        otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
})
let projectile2: Sprite = null
let E: Sprite = null
let projectile: Sprite = null
let face = 0
let statusbar: StatusBarSprite = null
let levelthing = 0
let list: tiles.TileMapData[] = []
let Gun: Sprite = null
let mySprite: platformer.PlatformerSprite = null
mySprite = platformer.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . a c f f c . . . . . . 
    . . . . a a c c f c c . . . . . 
    . . . . a f f 1 1 f . . . . . . 
    . . . . a c 1 f f 1 . . . . . . 
    . . . . . a c c c c . . . . . . 
    . . . . 3 c a 2 2 a . . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . a a . c c c c a 2 2 . . . . 
    . . a a . b b b b b c b . . . . 
    . . a a . a a . a a . . . . . . 
    . . a b . a a . a a . . . . . . 
    . . . b c c . c c . . . . . . . 
    . . . . c c . c c . . . . . . . 
    . . . . c c . c c c . . . . . . 
    `, SpriteKind.Player)
platformer.loopFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . c f f c a . . . . . . . 
    . . . c c f c c a a . . . . . . 
    . . . . f 1 1 f f a . . . . . . 
    . . . . 1 f f 1 c a . . . . . . 
    . . . . c c c c a . . . . . . . 
    . . . . a 2 2 a c 3 . . . . . . 
    . . . 2 a a a a c 2 3 . . . . . 
    . . . 2 a a a a c 2 3 . . . . . 
    . . 2 2 a c c c c . . . . . . . 
    . . b c b b b b b . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . . c c . c c . . . . . . 
    . . . . . c c . c c . . . . . . 
    . . . . c c c . c c . . . . . . 
    `],
500,
platformer.rule(platformer.PlatformerSpriteState.FacingLeft, platformer.PlatformerSpriteState.OnGround)
)
platformer.loopFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . a c f f c . . . . . . 
    . . . . a a c c f c c . . . . . 
    . . . . a f f 1 1 f . . . . . . 
    . . . . a c 1 f f 1 . . . . . . 
    . . . . . a c c c c . . . . . . 
    . . . . 3 c a 2 2 a . . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . . . c c c c a 2 2 . . . . 
    . . . . . b b b b b c b . . . . 
    . . . . . a a . a a . . . . . . 
    . . . . . a a . a a . . . . . . 
    . . . . c c . c c . . . . . . . 
    . . . . c c . c c . . . . . . . 
    . . . . c c . c c c . . . . . . 
    `],
500,
platformer.rule(platformer.PlatformerSpriteState.FacingRight, platformer.PlatformerSpriteState.OnGround)
)
platformer.runFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . c f f c a . . . . . . . 
    . . . c c f c c a a . . . . . . 
    . . . . f 1 1 f f a . . . . . . 
    . . . . 1 f f 1 c a . . . . . . 
    . . . . c c c c a . . . . . . . 
    . . . . a 2 2 a c 3 . . . . . . 
    . . . 2 a a a a c 2 3 . . . . . 
    . . . 2 a a a a c 2 3 . . . . . 
    . . 2 2 a c c c c . . . . . . . 
    . . b c b b b b b . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . . c c . c c . . . . . . 
    . . . . . c c . c c . . . . . . 
    . . . . c c c . c c . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 3 . . . . . 
    . . . 2 a a a a c 2 3 . . . . . 
    . . 2 2 a c c c c . . . . . . . 
    . . b c b b b b b . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . a a a c c . . . . . . . 
    . . . . . a c c c . . . . . . . 
    . . . . . . c c c . . . . . . . 
    . . . . . c c c . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 . . . . . . 
    . . . 2 a a a a c 2 3 . . . . . 
    . . . 2 c c c c c . . . . . . . 
    . . . b b b b b b . . . . . . . 
    . . . . a a a a a . . . . . . . 
    . . . . a a c c a . . . . . . . 
    . . . . . a c c c . . . . . . . 
    . . . . . . c c c . . . . . . . 
    . . . . . . c c c . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 . . . . . . 
    . . . 2 a a a a c 2 3 . . . . . 
    . . . 2 c c c c c . . . . . . . 
    . . . b b b b b b . . . . . . . 
    . . . . a a a a a . . . . . . . 
    . . . . a c c a a . . . . . . . 
    . . . . . c c c c . . . . . . . 
    . . . . . c c c c . . . . . . . 
    . . . . . . c c c . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 . . . . . . 
    . . . . a a a a c 2 3 . . . . . 
    . . . . c c c c c . . . . . . . 
    . . . . b b b b b . . . . . . . 
    . . . . a a a a a . . . . . . . 
    . . . . c c . a a . . . . . . . 
    . . . . c c . c c . . . . . . . 
    . . . . c c . c c . . . . . . . 
    . . . . . . c c c . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 . . . . . . 
    . . . . a a a a c 2 3 . . . . . 
    . . . . c c c c c . . . . . . . 
    . . . . b b b b b . . . . . . . 
    . . . . a a a a a . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . c c . . c c . . . . . . 
    . . . . c c . . c c . . . . . . 
    . . . . c c . c c c . . . . . . 
    `],
100,
platformer.rule(platformer.PlatformerSpriteState.FacingLeft, platformer.PlatformerSpriteState.Moving, platformer.PlatformerSpriteState.OnGround)
)
platformer.loopFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 . . . . . . 
    . . . . a a a a c 2 3 . . . . . 
    . . . . c c c c c . . . . . . . 
    . . . . b b b b b . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . . c c . c c . . . . . . 
    . . . . . c c . c c . . . . . . 
    . . . . c c c . c c . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 . . . . . . 
    . . . . a a a a c 2 3 . . . . . 
    . . . . c c c c c . . . . . . . 
    . . . . b b b b b . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . a a a c c . . . . . . . 
    . . . . . a c c c . . . . . . . 
    . . . . . . c c c . . . . . . . 
    . . . . . c c c . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 . . . . . . 
    . . . . a a a a c 2 3 . . . . . 
    . . . . c c c c c . . . . . . . 
    . . . . b b b b b . . . . . . . 
    . . . . a a a a a . . . . . . . 
    . . . . a c c a a . . . . . . . 
    . . . . . c c c c . . . . . . . 
    . . . . . c c c c . . . . . . . 
    . . . . . . c c c . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 . . . . . . 
    . . . . a a a a c 2 3 . . . . . 
    . . . . c c c c c . . . . . . . 
    . . . . b b b b b . . . . . . . 
    . . . . a a a a a . . . . . . . 
    . . . . c c . a a . . . . . . . 
    . . . . c c . c c . . . . . . . 
    . . . . c c . c c . . . . . . . 
    . . . . . . c c c . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . c f f c a . . . . . . . . 
    . . c c f c c a a . . . . . . . 
    . . . f 1 1 f f a . . . . . . . 
    . . . 1 f f 1 c a . . . . . . . 
    . . . c c c c a . . . . . . . . 
    . . . 2 a 2 2 a c . . . . . . . 
    . . . 2 a a a a c 2 . . . . . . 
    . . . . a a a a c 2 3 . . . . . 
    . . . . c c c c c . . . . . . . 
    . . . . b b b b b . . . . . . . 
    . . . . a a a a a . . . . . . . 
    . . . . a a . a a . . . . . . . 
    . . . . c c . . c c . . . . . . 
    . . . . c c . . c c . . . . . . 
    . . . . c c . c c c . . . . . . 
    `],
100,
platformer.rule(platformer.PlatformerSpriteState.Moving, platformer.PlatformerSpriteState.FacingLeft, platformer.PlatformerSpriteState.OnGround)
)
platformer.runFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . a c f f c . . . . 
    . . . . . . a a c c f c c . . . 
    . . . . . . a f f 1 1 f . . . . 
    . . . . . . a c 1 f f 1 . . . . 
    . . . . . . . a c c c c . . . . 
    . . . . . . 3 c a 2 2 a . . . . 
    . . . . . 3 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a 2 . . . 
    . . . . . . . c c c c a 2 2 . . 
    . . . . . . . b b b b b c b . . 
    . . . . . . . a a . a a . . . . 
    . . . . . . . a a . a a . . . . 
    . . . . . . c c . c c . . . . . 
    . . . . . . c c . c c . . . . . 
    . . . . . . c c . c c c . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . 3 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a 2 . . . 
    . . . . . . . c c c c a 2 2 . . 
    . . . . . . . b b b b b c b . . 
    . . . . . . . a a . a a . . . . 
    . . . . . . . c c a a a . . . . 
    . . . . . . . c c c a . . . . . 
    . . . . . . . c c c . . . . . . 
    . . . . . . . . c c c . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . . 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a 2 . . . 
    . . . . . . . c c c c c 2 . . . 
    . . . . . . . b b b b b b . . . 
    . . . . . . . a a a a a . . . . 
    . . . . . . . a c c a a . . . . 
    . . . . . . . c c c a . . . . . 
    . . . . . . . c c c . . . . . . 
    . . . . . . . c c c . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . . 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a 2 . . . 
    . . . . . . . c c c c c 2 . . . 
    . . . . . . . b b b b b b . . . 
    . . . . . . . a a a a a . . . . 
    . . . . . . . a a c c a . . . . 
    . . . . . . . c c c c . . . . . 
    . . . . . . . c c c c . . . . . 
    . . . . . . . c c c . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . . 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a . . . . 
    . . . . . . . c c c c c . . . . 
    . . . . . . . b b b b b . . . . 
    . . . . . . . a a a a a . . . . 
    . . . . . . . a a . c c . . . . 
    . . . . . . . c c . c c . . . . 
    . . . . . . . c c . c c . . . . 
    . . . . . . . c c c . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . . 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a . . . . 
    . . . . . . . c c c c c . . . . 
    . . . . . . . b b b b b . . . . 
    . . . . . . . a a a a a . . . . 
    . . . . . . . a a . a a . . . . 
    . . . . . . c c . . c c . . . . 
    . . . . . . c c . . c c . . . . 
    . . . . . . c c c . c c . . . . 
    `],
100,
platformer.rule(platformer.PlatformerSpriteState.FacingRight, platformer.PlatformerSpriteState.Moving, platformer.PlatformerSpriteState.OnGround)
)
platformer.loopFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . . 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a . . . . 
    . . . . . . . c c c c c . . . . 
    . . . . . . . b b b b b . . . . 
    . . . . . . . a a . a a . . . . 
    . . . . . . . a a . a a . . . . 
    . . . . . . c c . c c . . . . . 
    . . . . . . c c . c c . . . . . 
    . . . . . . c c . c c c . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . . 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a . . . . 
    . . . . . . . c c c c c . . . . 
    . . . . . . . b b b b b . . . . 
    . . . . . . . a a . a a . . . . 
    . . . . . . . c c a a a . . . . 
    . . . . . . . c c c a . . . . . 
    . . . . . . . c c c . . . . . . 
    . . . . . . . . c c c . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . . 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a . . . . 
    . . . . . . . c c c c c . . . . 
    . . . . . . . b b b b b . . . . 
    . . . . . . . a a a a a . . . . 
    . . . . . . . a a c c a . . . . 
    . . . . . . . c c c c . . . . . 
    . . . . . . . c c c c . . . . . 
    . . . . . . . c c c . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . . 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a . . . . 
    . . . . . . . c c c c c . . . . 
    . . . . . . . b b b b b . . . . 
    . . . . . . . a a a a a . . . . 
    . . . . . . . a a . c c . . . . 
    . . . . . . . c c . c c . . . . 
    . . . . . . . c c . c c . . . . 
    . . . . . . . c c c . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . a c f f c . . . 
    . . . . . . . a a c c f c c . . 
    . . . . . . . a f f 1 1 f . . . 
    . . . . . . . a c 1 f f 1 . . . 
    . . . . . . . . a c c c c . . . 
    . . . . . . . c a 2 2 a 2 . . . 
    . . . . . . 2 c a a a a 2 . . . 
    . . . . . 3 2 c a a a a . . . . 
    . . . . . . . c c c c c . . . . 
    . . . . . . . b b b b b . . . . 
    . . . . . . . a a a a a . . . . 
    . . . . . . . a a . a a . . . . 
    . . . . . . c c . . c c . . . . 
    . . . . . . c c . . c c . . . . 
    . . . . . . c c c . c c . . . . 
    `],
100,
platformer.rule(platformer.PlatformerSpriteState.Moving, platformer.PlatformerSpriteState.FacingRight, platformer.PlatformerSpriteState.OnGround)
)
platformer.runFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . . c f f c a . . . . . 
    . . . . . c c f c c a a . . . . 
    . . . . . . f 1 1 f f a . . . . 
    . . . . . . 1 f f 1 c a . . . . 
    . . . . . . c c c c a . . . . . 
    . . . . . . a 2 2 a c 3 . . . . 
    . . . . . 2 a a a a c 2 3 . . . 
    . . . . . 2 a a a a c 2 3 . . . 
    . . . . 2 2 a c c c c . . . . . 
    . . . . b c b b b b b . . . . . 
    . . . . . . a a . a a . . . . . 
    . . . . . . a a . a a . . . . . 
    . . . . . . . c c . c c . . . . 
    . . . . . . . c c . c c . . . . 
    . . . . . . c c c . c c . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . c f f c a . . . . . 
    . . . . . c c f c c a a . . . . 
    . . . . . . f 1 1 f f a . . . . 
    . . . . . . 1 f f 1 c a . . . . 
    . . . . . . c c c c a . . . . . 
    . . . . . . a 2 2 a c 3 . . . . 
    . . . . . 2 a a a a c 2 3 . . . 
    . . . . . 2 a a a a c 2 3 . . . 
    . . . . 2 2 a c c c c . . . . . 
    . . . . b c b b b b b . . . . . 
    . . . . . . a a . a a . . . . . 
    . . . . . . a a c c a c c . . . 
    . . . . . . . a c c a c c . . . 
    . . . . . . . . c c . c c . . . 
    . . . . . . . . . c . . c . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . c f f c a . . . . . 
    . . . . . c c f c c a a . . . . 
    . . . . . . f 1 1 f f a . . . . 
    . . . . . . 1 f f 1 c a . . . . 
    . . . . . . c c c c a . . . . . 
    . . . . . . a 2 2 a c 3 . . . . 
    . . . . . 2 a a a a c 2 3 . . . 
    . . . . . 2 a a a a c 2 3 . . . 
    . . . . . 2 a c c c c . . . . . 
    . . . . . b b b b b b . . . . . 
    . . . . . . a a . a a . . . . . 
    . . . . . . a a c c a c c . . . 
    . . . . . . . a c c a c c . . . 
    . . . . . . . . c c . c c . . . 
    . . . . . . . . . c . . c . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . c f f c a . . . . . 
    . . . . . c c f c c a a . . . . 
    . . . . . . f 1 1 f f a . . . . 
    . . . . . . 1 f f 1 c a . . . . 
    . . . . . . c c c c a . . . . . 
    . . . . . . a 2 2 a c 3 . . . . 
    . . . . . 2 a a a a c 2 3 . . . 
    . . . . . 2 a a a a c 2 3 . . . 
    . . . . . . a c c c c . . . . . 
    . . . . . . b b b b b . . . . . 
    . . . . . . a a . a a . . . . . 
    . . . . . . a a c c a c c . . . 
    . . . . . . . a c c a c c . . . 
    . . . . . . . . c c . c c . . . 
    . . . . . . . . . c . . c . . . 
    `],
50,
platformer.rule(platformer.PlatformerSpriteState.FacingLeft, platformer.PlatformerSpriteState.JumpingUp)
)
platformer.runFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . a c f f c . . . . . . 
    . . . . a a c c f c c . . . . . 
    . . . . a f f 1 1 f . . . . . . 
    . . . . a c 1 f f 1 . . . . . . 
    . . . . . a c c c c . . . . . . 
    . . . . 3 c a 2 2 a . . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . . . c c c c a 2 2 . . . . 
    . . . . . b b b b b c b . . . . 
    . . . . . a a . a a . . . . . . 
    . . . . . a a . a a . . . . . . 
    . . . . c c . c c . . . . . . . 
    . . . . c c . c c . . . . . . . 
    . . . . c c . c c c . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . a c f f c . . . . . . 
    . . . . a a c c f c c . . . . . 
    . . . . a f f 1 1 f . . . . . . 
    . . . . a c 1 f f 1 . . . . . . 
    . . . . . a c c c c . . . . . . 
    . . . . 3 c a 2 2 a . . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . . . c c c c a 2 2 . . . . 
    . . . . . b b b b b c b . . . . 
    . . . . . a a . a a . . . . . . 
    . . . c c a c c a a . . . . . . 
    . . . c c a c c a . . . . . . . 
    . . . c c . c c . . . . . . . . 
    . . . c . . c . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . a c f f c . . . . . . 
    . . . . a a c c f c c . . . . . 
    . . . . a f f 1 1 f . . . . . . 
    . . . . a c 1 f f 1 . . . . . . 
    . . . . . a c c c c . . . . . . 
    . . . . 3 c a 2 2 a . . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . . . c c c c a 2 . . . . . 
    . . . . . b b b b b b . . . . . 
    . . . . . a a . a a . . . . . . 
    . . . c c a c c a a . . . . . . 
    . . . c c a c c a . . . . . . . 
    . . . c c . c c . . . . . . . . 
    . . . c . . c . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . a c f f c . . . . . . 
    . . . . a a c c f c c . . . . . 
    . . . . a f f 1 1 f . . . . . . 
    . . . . a c 1 f f 1 . . . . . . 
    . . . . . a c c c c . . . . . . 
    . . . . 3 c a 2 2 a . . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . 3 2 c a a a a 2 . . . . . 
    . . . . . c c c c a . . . . . . 
    . . . . . b b b b b . . . . . . 
    . . . . . a a . a a . . . . . . 
    . . . c c a c c a a . . . . . . 
    . . . c c a c c a . . . . . . . 
    . . . c c . c c . . . . . . . . 
    . . . c . . c . . . . . . . . . 
    `],
50,
platformer.rule(platformer.PlatformerSpriteState.FacingRight, platformer.PlatformerSpriteState.JumpingUp)
)
platformer.loopFrames(
mySprite,
[img`
    b . . a c f f c . . . . . . . . 
    b c a a c c f c c . . . . . . . 
    a c a f f 1 1 f . . . . . . . . 
    a c a c 1 f f 1 . . . . . . . . 
    a c . a c c c c . . . . . . . . 
    2 2 2 c a 2 2 a . . . . . . . . 
    2 2 2 c a a a a 2 . . . . . . . 
    . . 2 c a a a a 2 . . . . . . . 
    . . . c c c c a 2 2 . . . . . . 
    . . . b b b b b c b . . . . . . 
    . . a a . . a a . . . . . . . . 
    . a a a . a a a . . . . . . . . 
    c c a . c c a . . . . . . . . . 
    c c . . c c . . . . . . . . . . 
    c c . . c c . . . . . . . . . . 
    c . . . c . . . . . . . . . . . 
    `],
500,
platformer.rule(platformer.PlatformerSpriteState.WallSliding, platformer.PlatformerSpriteState.OnWallLeft, platformer.PlatformerSpriteState.JumpingUp)
)
platformer.loopFrames(
mySprite,
[img`
    . . . . . . . . c f f c a . . b 
    . . . . . . . c c f c c a a c b 
    . . . . . . . . f 1 1 f f a c a 
    . . . . . . . . 1 f f 1 c a c a 
    . . . . . . . . c c c c a . c a 
    . . . . . . . . a 2 2 a c 2 2 2 
    . . . . . . . 2 a a a a c 2 2 2 
    . . . . . . . 2 a a a a c 2 . . 
    . . . . . . 2 2 a c c c c . . . 
    . . . . . . b c b b b b b . . . 
    . . . . . . . . a a . . a a . . 
    . . . . . . . . a a a . a a a . 
    . . . . . . . . . a c c . a c c 
    . . . . . . . . . . c c . . c c 
    . . . . . . . . . . c c . . c c 
    . . . . . . . . . . . c . . . c 
    `],
500,
platformer.rule(platformer.PlatformerSpriteState.WallSliding, platformer.PlatformerSpriteState.OnWallRight, platformer.PlatformerSpriteState.JumpingUp)
)
platformer.loopFrames(
mySprite,
[img`
    b . . a c f f c . . . . . . . . 
    b c a a c c f c c . . . . . . . 
    a c a f f 1 1 f . . . . . . . . 
    a c a c 1 f f 1 . . . . . . . . 
    a c . a c c c c . . . . . . . . 
    2 2 2 c a 2 2 a . . . . . . . . 
    2 2 2 c a a a a 2 . . . . . . . 
    . . 2 c a a a a 2 . . . . . . . 
    . . . c c c c a 2 2 . . . . . . 
    . . . b b b b b c b . . . . . . 
    . . a a . . a a . . . . . . . . 
    . a a a . a a a . . . . . . . . 
    c c a . c c a . . . . . . . . . 
    c c . . c c . . . . . . . . . . 
    c c . . c c . . . . . . . . . . 
    c . . . c . . . . . . . . . . . 
    `],
500,
platformer.rule(platformer.PlatformerSpriteState.WallSliding, platformer.PlatformerSpriteState.OnWallLeft)
)
platformer.loopFrames(
mySprite,
[img`
    . . . . . . . . c f f c a . . b 
    . . . . . . . c c f c c a a c b 
    . . . . . . . . f 1 1 f f a c a 
    . . . . . . . . 1 f f 1 c a c a 
    . . . . . . . . c c c c a . c a 
    . . . . . . . . a 2 2 a c 2 2 2 
    . . . . . . . 2 a a a a c 2 2 2 
    . . . . . . . 2 a a a a c 2 . . 
    . . . . . . 2 2 a c c c c . . . 
    . . . . . . b c b b b b b . . . 
    . . . . . . . . a a . . a a . . 
    . . . . . . . . a a a . a a a . 
    . . . . . . . . . a c c . a c c 
    . . . . . . . . . . c c . . c c 
    . . . . . . . . . . c c . . c c 
    . . . . . . . . . . . c . . . c 
    `],
500,
platformer.rule(platformer.PlatformerSpriteState.WallSliding, platformer.PlatformerSpriteState.OnWallRight)
)
platformer.runFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . c f f c a . . . . 
    . . . . . . c c f c c a a . . . 
    . . . . . . . f 1 1 f f a . . . 
    . . . . . . . 1 f f 1 c a . . . 
    . . . . . . . c c c c a . . . . 
    . . . . . . . a 2 2 a c 2 . . . 
    . . . . . . 2 a a a a c 2 2 . . 
    . . . . . . 2 a a a a c 2 2 . . 
    . . . . . 2 2 a c c c c . a a . 
    . . . . . b c b b b b b . a a . 
    . . . . . . . a a . a a . a a . 
    . . . . . . . a a . a a . b a . 
    . . . . . . . . c c . c c b . . 
    . . . . . . . . c c . c c . . . 
    . . . . . . . c c c . c c . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . c f f c a . . . 
    . . . . . . . c c f c c a a . . 
    . . . . . . . . f 1 1 f f a . . 
    . . . . . . . . 1 f f 1 c a . . 
    . . . . . . . . c c c c a . . . 
    . . . . . . . . a 2 2 a c 2 2 . 
    . . . . . . . 2 a a a a c 2 2 . 
    . . . . . . . 2 a a a a c 2 a a 
    . . . . . . 2 2 a c c c c . a a 
    . . . . . . b c b b b b b . a a 
    . . . . . . . . a a . a a . b a 
    . . . . . . . . a a . a a . b . 
    . . . . . . . . . . c c . c c . 
    . . . . . . . . . . c c . c c . 
    . . . . . . . . . c c c . c c . 
    `,img`
    . . . . . . . . c f f c a . . b 
    . . . . . . . c c f c c a a c b 
    . . . . . . . . f 1 1 f f a c a 
    . . . . . . . . 1 f f 1 c a c a 
    . . . . . . . . c c c c a . c a 
    . . . . . . . . a 2 2 a c 2 2 2 
    . . . . . . . 2 a a a a c 2 2 2 
    . . . . . . . 2 a a a a c 2 . . 
    . . . . . . 2 2 a c c c c . . . 
    . . . . . . b c b b b b b . . . 
    . . . . . . . . a a . a a . . . 
    . . . . . . . . a a . a a . . . 
    . . . . . . . . . c c . c c . . 
    . . . . . . . . . c c . c c . . 
    . . . . . . . . . c c . c c . . 
    . . . . . . . . . . c . . c . . 
    `,img`
    . . . . . . . . c f f c a . . b 
    . . . . . . . c c f c c a a c b 
    . . . . . . . . f 1 1 f f a c a 
    . . . . . . . . 1 f f 1 c a c a 
    . . . . . . . . c c c c a . c a 
    . . . . . . . . a 2 2 a c 2 2 2 
    . . . . . . . 2 a a a a c 2 2 2 
    . . . . . . . 2 a a a a c 2 . . 
    . . . . . . 2 2 a c c c c . . . 
    . . . . . . b c b b b b b . . . 
    . . . . . . . . a a . . a a . . 
    . . . . . . . . a a a . a a a . 
    . . . . . . . . . a c c . a c c 
    . . . . . . . . . . c c . . c c 
    . . . . . . . . . . c c . . c c 
    . . . . . . . . . . . c . . . c 
    `],
50,
platformer.rule(platformer.PlatformerSpriteState.PushingWallLeft, platformer.PlatformerSpriteState.WallSliding)
)
platformer.runFrames(
mySprite,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . a c f f c . . . . . . . 
    . . . a a c c f c c . . . . . . 
    . . . a f f 1 1 f . . . . . . . 
    . . . a c 1 f f 1 . . . . . . . 
    . . . . a c c c c . . . . . . . 
    . . . 2 c a 2 2 a . . . . . . . 
    . . 2 2 c a a a a 2 . . . . . . 
    . . 2 2 c a a a a 2 . . . . . . 
    . a a . c c c c a 2 2 . . . . . 
    . a a . b b b b b c b . . . . . 
    . a a . a a . a a . . . . . . . 
    . a b . a a . a a . . . . . . . 
    . . b c c . c c . . . . . . . . 
    . . . c c . c c . . . . . . . . 
    . . . c c . c c c . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . a c f f c . . . . . . . . 
    . . a a c c f c c . . . . . . . 
    . . a f f 1 1 f . . . . . . . . 
    . . a c 1 f f 1 . . . . . . . . 
    . . . a c c c c . . . . . . . . 
    . 2 2 c a 2 2 a . . . . . . . . 
    . 2 2 c a a a a 2 . . . . . . . 
    a a 2 c a a a a 2 . . . . . . . 
    a a . c c c c a 2 2 . . . . . . 
    a a . b b b b b c b . . . . . . 
    a b . a a . a a . . . . . . . . 
    . b . a a . a a . . . . . . . . 
    . c c . c c . . . . . . . . . . 
    . c c . c c . . . . . . . . . . 
    . c c . c c c . . . . . . . . . 
    `,img`
    b . . a c f f c . . . . . . . . 
    b c a a c c f c c . . . . . . . 
    a c a f f 1 1 f . . . . . . . . 
    a c a c 1 f f 1 . . . . . . . . 
    a c . a c c c c . . . . . . . . 
    2 2 2 c a 2 2 a . . . . . . . . 
    2 2 2 c a a a a 2 . . . . . . . 
    . . 2 c a a a a 2 . . . . . . . 
    . . . c c c c a 2 2 . . . . . . 
    . . . b b b b b c b . . . . . . 
    . . . a a . a a . . . . . . . . 
    . . . a a . a a . . . . . . . . 
    . . c c . c c . . . . . . . . . 
    . . c c . c c . . . . . . . . . 
    . . c c . c c . . . . . . . . . 
    . . c . . c . . . . . . . . . . 
    `,img`
    b . . a c f f c . . . . . . . . 
    b c a a c c f c c . . . . . . . 
    a c a f f 1 1 f . . . . . . . . 
    a c a c 1 f f 1 . . . . . . . . 
    a c . a c c c c . . . . . . . . 
    2 2 2 c a 2 2 a . . . . . . . . 
    2 2 2 c a a a a 2 . . . . . . . 
    . . 2 c a a a a 2 . . . . . . . 
    . . . c c c c a 2 2 . . . . . . 
    . . . b b b b b c b . . . . . . 
    . . a a . . a a . . . . . . . . 
    . a a a . a a a . . . . . . . . 
    c c a . c c a . . . . . . . . . 
    c c . . c c . . . . . . . . . . 
    c c . . c c . . . . . . . . . . 
    c . . . c . . . . . . . . . . . 
    `],
50,
platformer.rule(platformer.PlatformerSpriteState.WallSliding, platformer.PlatformerSpriteState.PushingWallRight)
)
platformer.moveSprite(mySprite, true, 60)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.JumpOnAPressed, true)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.CoyoteTime, true)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.AllowJumpCancellation, false)
Gun = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . a a a b b . . . . . . . . . 
    . . a a a a . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.cat)
Gun.setFlag(SpriteFlag.Ghost, true)
Gun.z = 10
scene.cameraFollowSprite(mySprite)
list = [
tilemap`level2`,
tilemap`level4`,
tilemap`level8`,
tilemap`level9`,
tilemap`level10`
]
levelthing = 0
doSomething()
statusbar = statusbars.create(40, 4, StatusBarKind.Health)
statusbar.max = 20
statusbar.value = 20
statusbar.setLabel("HP")
statusbar.setPosition(128, 5)
let Time = 0
All_powers()
info.startCountup(true)
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sprites.readDataNumber(value, "T") == 3) {
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Left))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
                value.vx = 30
                sprites.setDataNumber(value, "m", 30)
            }
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Right))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
                value.vx = -30
                sprites.setDataNumber(value, "m", -30)
            }
        }
        if (sprites.readDataNumber(value, "T") == 1) {
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Left))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
                value.vx = 40
                sprites.setDataNumber(value, "m", 40)
            }
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Right))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
                value.vx = -40
                sprites.setDataNumber(value, "m", -40)
            }
        }
        if (sprites.readDataNumber(value, "T") == 7) {
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Left))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
                value.vx = 60
                sprites.setDataNumber(value, "m", 60)
            }
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Right))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
                value.vx = -60
                sprites.setDataNumber(value, "m", -60)
            }
        }
        if (sprites.readDataNumber(value, "T") == 9) {
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Left))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
                value.vx = 70
                sprites.setDataNumber(value, "m", 70)
            }
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Right))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
                value.vx = -70
                sprites.setDataNumber(value, "m", -70)
            }
        }
        if (sprites.readDataNumber(value, "T") == 2) {
            for (let AME of spriteutils.getSpritesWithin(SpriteKind.Player, 140, value)) {
                if (value.x < AME.x) {
                    characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingRight))
                }
                if (value.x > AME.x) {
                    characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingLeft))
                }
            }
        }
        if (sprites.readDataNumber(value, "T") == 4) {
            for (let AME of spriteutils.getSpritesWithin(SpriteKind.Player, 140, value)) {
                if (value.x < AME.x) {
                    characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingRight))
                }
                if (value.x > AME.x) {
                    characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingLeft))
                }
            }
        }
        if (sprites.readDataNumber(value, "T") == 6) {
            for (let AME of spriteutils.getSpritesWithin(SpriteKind.Player, 140, value)) {
                if (value.x < AME.x) {
                    characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingRight))
                }
                if (value.x > AME.x) {
                    characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingLeft))
                }
            }
        }
        if (sprites.readDataNumber(value, "T") == 5) {
            if (tiles.tileAtLocationEquals(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left).getNeighboringLocation(CollisionDirection.Left), assets.tile`myTile39`) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left).getNeighboringLocation(CollisionDirection.Left))) {
                value.vx = 100
                sprites.setDataNumber(value, "m", 100)
            }
            if (tiles.tileAtLocationEquals(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right).getNeighboringLocation(CollisionDirection.Right), assets.tile`myTile39`) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right).getNeighboringLocation(CollisionDirection.Right))) {
                value.vx = -100
                sprites.setDataNumber(value, "m", -100)
            }
        }
        if (sprites.readDataNumber(value, "T") == 8) {
            if (tiles.tileAtLocationEquals(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left), assets.tile`myTile39`) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
                value.vx = 60
                sprites.setDataNumber(value, "m", 60)
            }
            if (tiles.tileAtLocationEquals(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right), assets.tile`myTile39`) || tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
                value.vx = -60
                sprites.setDataNumber(value, "m", -60)
            }
        }
    }
})
game.onUpdate(function () {
    Gun.x = mySprite.x
    Gun.y = mySprite.y
})
game.onUpdateInterval(500, function () {
    if (0 < sprites.allOfKind(SpriteKind.Player).length || (0 < sprites.allOfKind(SpriteKind.Enemy).length || (0 < sprites.allOfKind(SpriteKind.cat).length || 0 < sprites.allOfKind(SpriteKind.Projectile).length))) {
        console.logValue("All Projectile ", convertToText(sprites.allOfKind(SpriteKind.Projectile).length))
        console.logValue("All Players ", convertToText(sprites.allOfKind(SpriteKind.Player).length))
        console.logValue("All Enemy", convertToText(sprites.allOfKind(SpriteKind.Enemy).length))
        console.logValue("All Cat ", convertToText(sprites.allOfKind(SpriteKind.cat).length))
    }
})
forever(function () {
    if (!(platformer.hasState(mySprite, platformer.PlatformerSpriteState.Moving) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingRight) || platformer.hasState(mySprite, platformer.PlatformerSpriteState.Moving) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingLeft))) {
        if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.OnGround)) {
            platformer.moveSprite(mySprite, true, 80)
        }
    }
})
forever(function () {
    if (controller.up.isPressed() && controller.left.isPressed()) {
        face = 8
    } else if (controller.up.isPressed() && controller.right.isPressed()) {
        face = 7
    } else if (controller.down.isPressed() && controller.right.isPressed()) {
        face = 6
    } else if (controller.down.isPressed() && controller.left.isPressed()) {
        face = 5
    } else if (controller.up.isPressed()) {
        face = 1
    } else if (controller.left.isPressed()) {
        face = 2
    } else if (controller.right.isPressed()) {
        face = 3
    } else if (controller.down.isPressed()) {
        face = 4
    }
})
forever(function () {
    if (!(spriteutils.isDestroyed(mySprite))) {
        if (mySprite.tileKindAt(TileDirection.Center, assets.tile`myTile16`)) {
            All_powers()
            sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
            sprites.destroyAllSpritesOfKind(SpriteKind.Food)
            sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
            statusbar.max = 20
            statusbar.value = 20
            doSomething()
        }
        if (mySprite.tileKindAt(TileDirection.Center, assets.tile`myTile38`)) {
            sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
            sprites.destroyAllSpritesOfKind(SpriteKind.Food)
            sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
            statusbar.max = 20
            statusbar.value = 20
            levelthing += 1
            doSomething()
        }
        if (mySprite.tileKindAt(TileDirection.Center, assets.tile`myTile52`)) {
            All_powers()
            sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
            sprites.destroyAllSpritesOfKind(SpriteKind.Food)
            sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
            statusbar.max = 20
            statusbar.value = 20
            doSomething()
        }
    }
})
forever(function () {
    timer.throttle("Thinmg", 2100, function () {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataNumber(value, "T") == 8) {
                for (let AME of spriteutils.getSpritesWithin(SpriteKind.Player, 140, value)) {
                    if (value.x < AME.x) {
                        characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingRight))
                        projectile2 = sprites.createProjectileFromSprite(img`
                            . . 2 3 . 
                            1 1 2 2 2 
                            . . 3 2 . 
                            `, value, 100, 0)
                        projectile2.setKind(SpriteKind.EFIRE)
                        timer.after(200, function () {
                            projectile2 = sprites.createProjectileFromSprite(img`
                                . . 2 3 . 
                                1 1 2 2 2 
                                . . 3 2 . 
                                `, value, 100, 0)
                            projectile2.setKind(SpriteKind.EFIRE)
                            timer.after(200, function () {
                                projectile2 = sprites.createProjectileFromSprite(img`
                                    . . 2 3 . 
                                    1 1 2 2 2 
                                    . . 3 2 . 
                                    `, value, 100, 0)
                                projectile2.setKind(SpriteKind.EFIRE)
                            })
                        })
                    }
                    if (value.x > AME.x) {
                        characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingLeft))
                        projectile2 = sprites.createProjectileFromSprite(img`
                            . 3 2 . . 
                            2 2 2 1 1 
                            . 2 3 . . 
                            `, value, -100, 0)
                        projectile2.setKind(SpriteKind.EFIRE)
                        timer.after(200, function () {
                            projectile2 = sprites.createProjectileFromSprite(img`
                                . 3 2 . . 
                                2 2 2 1 1 
                                . 2 3 . . 
                                `, value, -100, 0)
                            projectile2.setKind(SpriteKind.EFIRE)
                            timer.after(200, function () {
                                projectile2 = sprites.createProjectileFromSprite(img`
                                    . 3 2 . . 
                                    2 2 2 1 1 
                                    . 2 3 . . 
                                    `, value, -100, 0)
                                projectile2.setKind(SpriteKind.EFIRE)
                            })
                        })
                    }
                }
            }
        }
    })
    timer.throttle("MUSH", 2100, function () {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataNumber(value, "T") == 6) {
                for (let AME of spriteutils.getSpritesWithin(SpriteKind.Player, 140, value)) {
                    if (value.x < AME.x) {
                        characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingRight))
                        projectile2 = sprites.createProjectileFromSprite(img`
                            . . 2 3 . 
                            1 1 2 2 2 
                            . . 3 2 . 
                            `, value, 50, 0)
                        projectile2.setKind(SpriteKind.EFIRE)
                        timer.after(150, function () {
                            projectile2 = sprites.createProjectileFromSprite(img`
                                . . 2 3 . 
                                1 1 2 2 2 
                                . . 3 2 . 
                                `, value, 50, 0)
                            projectile2.setKind(SpriteKind.EFIRE)
                        })
                    }
                    if (value.x > AME.x) {
                        characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingLeft))
                        projectile2 = sprites.createProjectileFromSprite(img`
                            . 3 2 . . 
                            2 2 2 1 1 
                            . 2 3 . . 
                            `, value, -50, 0)
                        projectile2.setKind(SpriteKind.EFIRE)
                        timer.after(150, function () {
                            projectile2 = sprites.createProjectileFromSprite(img`
                                . 3 2 . . 
                                2 2 2 1 1 
                                . 2 3 . . 
                                `, value, -50, 0)
                            projectile2.setKind(SpriteKind.EFIRE)
                        })
                    }
                }
            }
        }
    })
    timer.throttle("Shott", 2000, function () {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataNumber(value, "T") == 2) {
                for (let AME of spriteutils.getSpritesWithin(SpriteKind.Player, 140, value)) {
                    if (value.x < AME.x) {
                        characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingRight))
                        projectile2 = sprites.createProjectileFromSprite(img`
                            b b 
                            b b 
                            `, value, 100, 0)
                        projectile2.setKind(SpriteKind.EFIRE)
                    }
                    if (value.x > AME.x) {
                        characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingLeft))
                        projectile2 = sprites.createProjectileFromSprite(img`
                            b b 
                            b b 
                            `, value, -100, 0)
                        projectile2.setKind(SpriteKind.EFIRE)
                    }
                }
            }
        }
    })
    timer.throttle("CATY", 5000, function () {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataNumber(value, "T") == 4) {
                for (let AME of spriteutils.getSpritesWithin(SpriteKind.Player, 140, value)) {
                    for (let index = 0; index < 100; index++) {
                        if (value.x < AME.x) {
                            characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingRight))
                            projectile2 = sprites.createProjectileFromSprite(img`
                                b b 
                                b b 
                                `, value, 100, randint(-10, 10))
                            projectile2.setKind(SpriteKind.EFIRE)
                        }
                        if (value.x > AME.x) {
                            characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingLeft))
                            projectile2 = sprites.createProjectileFromSprite(img`
                                b b 
                                b b 
                                `, value, -100, randint(-10, 10))
                            projectile2.setKind(SpriteKind.EFIRE)
                        }
                        pause(100)
                    }
                }
            }
        }
    })
})
forever(function () {
    if (controller.B.isPressed() && sprites.readDataBoolean(mySprite, "RApict")) {
        shoot()
        pause(200)
    }
})
forever(function () {
    if (mySprite.tileKindAt(TileDirection.Left, assets.tile`myTile39`)) {
        for (let value of tiles.getTilesByType(assets.tile`myTile39`)) {
            tiles.setTileAt(value, assets.tile`myTile35`)
            tiles.setWallAt(value, true)
            pause(100)
        }
    }
})
forever(function () {
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingLeft) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.OnGround)) {
        if (face == 8) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . b . . . . . . . . 
                . . . . . . . . b a . . . . . . 
                . . . . . . . . a a a . . . . . 
                . . . . . . . . . a a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 7) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . b . 
                . . . . . . . . . . . . a b . . 
                . . . . . . . . . . . a a a . . 
                . . . . . . . . . . a a a . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 6) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a a . . . 
                . . . . . . . . . . . a a a . . 
                . . . . . . . . . . . . a b . . 
                . . . . . . . . . . . . . . b . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 5) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . a a a . . . . 
                . . . . . . . . a a a . . . . . 
                . . . . . . . . b a . . . . . . 
                . . . . . . . b . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 1) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . b . . . . . 
                . . . . . . . . . . b a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 2) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . b b a a a . . . . 
                . . . . . . . . a a a a . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 3) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . a a a b b . 
                . . . . . . . . . . a a a a . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 4) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . b a . . . . 
                . . . . . . . . . . b . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingRight) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.OnGround)) {
        if (face == 8) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                b a . . . . . . . . . . . . . . 
                a a a . . . . . . . . . . . . . 
                . a a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 7) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . b . . . . . . . . . 
                . . . . a b . . . . . . . . . . 
                . . . a a a . . . . . . . . . . 
                . . a a a . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 6) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a a . . . . . . . . . . . 
                . . . a a a . . . . . . . . . . 
                . . . . a b . . . . . . . . . . 
                . . . . . . b . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 5) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . a a a . . . . . . . . . . . . 
                a a a . . . . . . . . . . . . . 
                b a . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 1) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . b . . . . . . . . . . . . . 
                . . b a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 2) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                b b a a a . . . . . . . . . . . 
                . a a a a . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 3) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . a a a b b . . . . . . . . . 
                . . a a a a . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 4) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a b . . . . . . . . . . . . 
                . . . b . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingLeft) && (platformer.hasState(mySprite, platformer.PlatformerSpriteState.Moving) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.OnGround))) {
        if (face == 8) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . b . . . . . . . . 
                . . . . . . . . b a . . . . . . 
                . . . . . . . . a a a . . . . . 
                . . . . . . . . . a a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 7) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . b . 
                . . . . . . . . . . . . a b . . 
                . . . . . . . . . . . a a a . . 
                . . . . . . . . . . a a a . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 6) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a a . . . 
                . . . . . . . . . . . a a a . . 
                . . . . . . . . . . . . a b . . 
                . . . . . . . . . . . . . . b . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 5) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . a a a . . . . 
                . . . . . . . . a a a . . . . . 
                . . . . . . . . b a . . . . . . 
                . . . . . . . b . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 1) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . b . . . . 
                . . . . . . . . . . a b . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 2) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . b b a a a . . . . 
                . . . . . . . . a a a a . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 3) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . a a a b b . 
                . . . . . . . . . . a a a a . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 4) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . a a . . . . 
                . . . . . . . . . . b a . . . . 
                . . . . . . . . . . b . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingRight) && (platformer.hasState(mySprite, platformer.PlatformerSpriteState.Moving) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.OnGround))) {
        if (face == 8) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . b . . . . . . . . . . . . . . 
                . . b a . . . . . . . . . . . . 
                . . a a a . . . . . . . . . . . 
                . . . a a a . . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 7) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . b . . . . . . . 
                . . . . . . a b . . . . . . . . 
                . . . . . a a a . . . . . . . . 
                . . . . a a a . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 6) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . . a a a . . . . . . . . . 
                . . . . . a a a . . . . . . . . 
                . . . . . . a b . . . . . . . . 
                . . . . . . . . b . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 5) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . a a a . . . . . . . . . . 
                . . a a a . . . . . . . . . . . 
                . . b a . . . . . . . . . . . . 
                . b . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 1) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . b . . . . . . . . . . 
                . . . . a b . . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 2) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . b b a a a . . . . . . . . . . 
                . . a a a a . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 3) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . a a a b b . . . . . . . 
                . . . . a a a a . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 4) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . . a a . . . . . . . . . . 
                . . . . a b . . . . . . . . . . 
                . . . . . b . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingLeft) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.JumpingUp)) {
        if (face == 8) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . b . . . . . . 
                . . . . . . . . . . b a . . . . 
                . . . . . . . . . . a a a . . . 
                . . . . . . . . . . . a a a . . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 7) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . a b 
                . . . . . . . . . . . . . a a a 
                . . . . . . . . . . . . a a a . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 6) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . . a a a . 
                . . . . . . . . . . . . . a a a 
                . . . . . . . . . . . . . . a b 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 5) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . a a a . . 
                . . . . . . . . . . a a a . . . 
                . . . . . . . . . . b a . . . . 
                . . . . . . . . . b . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 1) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . b . . 
                . . . . . . . . . . . . a b . . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 2) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . b b a a a . . 
                . . . . . . . . . . a a a a . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 3) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . a a a b b 
                . . . . . . . . . . . a a a a . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 4) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . . a a . . 
                . . . . . . . . . . . . b a . . 
                . . . . . . . . . . . . b . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingRight) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.JumpingUp)) {
        if (face == 8) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                b a . . . . . . . . . . . . . . 
                a a a . . . . . . . . . . . . . 
                . a a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 7) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . b . . . . . . . . . 
                . . . . a b . . . . . . . . . . 
                . . . a a a . . . . . . . . . . 
                . . a a a . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 6) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a a . . . . . . . . . . . 
                . . . a a a . . . . . . . . . . 
                . . . . a b . . . . . . . . . . 
                . . . . . . b . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 5) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . a a a . . . . . . . . . . . . 
                a a a . . . . . . . . . . . . . 
                b a . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 1) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . b . . . . . . . . . . . . . 
                . . b a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 2) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                b b a a a . . . . . . . . . . . 
                . a a a a . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 3) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . a a a b b . . . . . . . . . 
                . . a a a a . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (face == 4) {
            Gun.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a a . . . . . . . . . . . . 
                . . a b . . . . . . . . . . . . 
                . . . b . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.OnWallLeft) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.WallSliding)) {
        Gun.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.OnWallRight) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.WallSliding)) {
        Gun.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
})
forever(function () {
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.Moving) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingRight) || platformer.hasState(mySprite, platformer.PlatformerSpriteState.Moving) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingLeft)) {
        if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.OnGround)) {
            timer.after(600, function () {
                if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.Moving) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingRight) || platformer.hasState(mySprite, platformer.PlatformerSpriteState.Moving) && platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingLeft)) {
                    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.OnGround)) {
                        platformer.moveSprite(mySprite, true, 100)
                    }
                }
            })
        }
    }
})
