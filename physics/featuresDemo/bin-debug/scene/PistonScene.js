var PistonScene = (function (_super) {
    __extends(PistonScene, _super);
    function PistonScene() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=PistonScene,p=c.prototype;
    p.onAddToStage = function () {
        this.createGameScene();
    };
    p.createGameScene = function () {
        this.init();
        this.createDebug();
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    p.init = function () {
        var R = 0.7, L = R * 3;
        var world = new p2.World({
            gravity: [0, 0]
        });
        this.world = world;
        world.solver.iterations = 30;
        world.solver.tolerance = 0.01;
        // Create static dummy body that we can constrain other bodies to
        var dummyBody = new p2.Body({
            mass: 0,
        });
        world.addBody(dummyBody);
        // Create circle
        var shape = new p2.Circle({ radius: R }), circleBody = new p2.Body({
            mass: 1,
            position: [0, 0],
        });
        circleBody.addShape(shape);
        world.addBody(circleBody);
        // Constrain it to the world
        var c = new p2.RevoluteConstraint(circleBody, dummyBody, {
            worldPivot: [0, 0],
            collideConnected: false
        });
        c.enableMotor();
        c.setMotorSpeed(5);
        world.addConstraint(c);
        // Create arm
        var armShape = new p2.Box({ width: L, height: 0.1 * L });
        var armBody = new p2.Body({
            mass: 1,
        });
        armBody.addShape(armShape);
        world.addBody(armBody);
        // Constrain arm to circle
        var c2 = new p2.RevoluteConstraint(circleBody, armBody, {
            localPivotA: [R * 0.7, 0],
            localPivotB: [L / 2, 0],
            collideConnected: false
        });
        world.addConstraint(c2);
        // Piston
        var pistonShape = new p2.Box({ width: 1, height: 1 });
        var pistonBody = new p2.Body({
            mass: 1,
        });
        pistonBody.addShape(pistonShape);
        world.addBody(pistonBody);
        // Connect piston to arm
        var c3 = new p2.RevoluteConstraint(pistonBody, armBody, {
            localPivotA: [0, 0],
            localPivotB: [-L / 2, 0],
            collideConnected: false
        });
        world.addConstraint(c3);
        // Prismatic constraint to keep the piston along a line
        var c4 = new p2.PrismaticConstraint(dummyBody, pistonBody, {
            localAnchorA: [0, 0],
            localAnchorB: [0, 0],
            localAxisA: [1, 0],
            collideConnected: false
        });
        world.addConstraint(c4);
    };
    p.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
    };
    p.createDebug = function () {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
        this.debugDraw.setLineWidth(0.02);
        sprite.x = this.stage.stageWidth / 2;
        sprite.y = this.stage.stageHeight / 2;
        sprite.scaleX = 50;
        sprite.scaleY = -50;
        this.dragHelper = new DragHelper(this.stage, sprite, this.world);
    };
    return PistonScene;
}(egret.DisplayObjectContainer));
egret.registerClass(PistonScene,'PistonScene');
//# sourceMappingURL=PistonScene.js.map