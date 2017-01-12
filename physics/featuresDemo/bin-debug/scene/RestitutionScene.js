var RestitutionScene = (function (_super) {
    __extends(RestitutionScene, _super);
    function RestitutionScene() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=RestitutionScene,p=c.prototype;
    p.onAddToStage = function () {
        this.createGameScene();
    };
    p.createGameScene = function () {
        this.init();
        this.createDebug();
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    p.init = function () {
        // Create a World
        var world = new p2.World({
            gravity: [0, -10]
        });
        this.world = world;
        var ballBody1 = new p2.Body({
            position: [-2, 1],
            mass: 1
        });
        // Create a material for the circle shape
        var circleShape1 = new p2.Circle({ radius: 0.5 });
        circleShape1.material = new p2.Material(1);
        ballBody1.addShape(circleShape1);
        // Remove damping from the ball, so it does not lose energy
        ballBody1.damping = 0;
        ballBody1.angularDamping = 0;
        // Add ball to world
        world.addBody(ballBody1);
        // Create a platform that the ball can bounce on
        var platformShape1 = new p2.Box({ width: 1, height: 1 });
        var platformBody1 = new p2.Body({
            position: [-2, -1],
        });
        platformBody1.addShape(platformShape1);
        world.addBody(platformBody1);
        // Create material for the platform
        platformShape1.material = new p2.Material(2);
        // Create contact material between the two materials.
        // The ContactMaterial defines what happens when the two materials meet.
        // In this case, we use some restitution.
        world.addContactMaterial(new p2.ContactMaterial(platformShape1.material, circleShape1.material, {
            restitution: 1.0,
            stiffness: Number.MAX_VALUE // We need infinite stiffness to get exact restitution
        }));
        // Create another ball
        var circleShape2 = new p2.Circle({ radius: 0.5 });
        circleShape2.material = new p2.Material(3);
        var ballBody2 = new p2.Body({
            position: [0, 1],
            mass: 1
        });
        ballBody2.addShape(circleShape2);
        ballBody2.damping = 0;
        ballBody2.angularDamping = 0;
        world.addBody(ballBody2);
        // Create another platform
        var platformShape2 = new p2.Box({ width: 1, height: 1 });
        var platformBody2 = new p2.Body({
            position: [0, -1],
        });
        platformBody2.addShape(platformShape2);
        world.addBody(platformBody2);
        platformShape2.material = new p2.Material(4);
        world.addContactMaterial(new p2.ContactMaterial(platformShape2.material, circleShape2.material, {
            restitution: 0.0,
        }));
        // New ball
        var circleShape3 = new p2.Circle({ radius: 0.5 });
        circleShape3.material = new p2.Material(5);
        var ballBody3 = new p2.Body({
            position: [2, 1],
            mass: 1
        });
        ballBody3.addShape(circleShape3);
        ballBody3.damping = 0;
        ballBody3.angularDamping = 0;
        world.addBody(ballBody3);
        var planeShape3 = new p2.Box({ width: 1, height: 1 });
        var plane3 = new p2.Body({
            position: [2, -1],
        });
        plane3.addShape(planeShape3);
        world.addBody(plane3);
        // Create material for the plane shape
        planeShape3.material = new p2.Material(6);
        world.addContactMaterial(new p2.ContactMaterial(planeShape3.material, circleShape3.material, {
            restitution: 0.0,
            stiffness: 200,
            relaxation: 0.1
        }));
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
    return RestitutionScene;
}(egret.DisplayObjectContainer));
egret.registerClass(RestitutionScene,'RestitutionScene');
//# sourceMappingURL=RestitutionScene.js.map