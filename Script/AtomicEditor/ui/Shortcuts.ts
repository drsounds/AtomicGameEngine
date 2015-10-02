//
// Copyright (c) 2014-2015, THUNDERBEAST GAMES LLC All rights reserved
// LICENSE: Atomic Game Engine Editor and Tools EULA
// Please see LICENSE_ATOMIC_EDITOR_AND_TOOLS.md in repository root for
// license information: https://github.com/AtomicGameEngine/AtomicGameEngine
//

import EditorEvents = require("../editor/EditorEvents");
import EditorUI = require("./EditorUI");

class Shortcuts extends Atomic.ScriptObject {

    constructor() {

        super();

        this.subscribeToEvent("UIShortcut", (ev: Atomic.UIShortcutEvent) => this.handleUIShortcut(ev));


    }

    invokePlay() {

        this.sendEvent(EditorEvents.SaveAllResources);
        Atomic.editorMode.playProject();

    }

    invokeFormatCode() {

        var editor = EditorUI.getMainFrame().resourceframe.currentResourceEditor;

        if (editor && editor.typeName == "JSResourceEditor") {

            (<Editor.JSResourceEditor>editor).formatCode();

        }

    }

    invokeFileClose() {

        // pretty gross
        var editor = EditorUI.getMainFrame().resourceframe.currentResourceEditor;
        if (!editor) return;
        editor.close(true);

    }

    invokeFileSave() {
        this.sendEvent(EditorEvents.SaveResource);
    }


    // global shortcut handler
    handleUIShortcut(ev: Atomic.UIShortcutEvent) {
        var cmdKey;
        if(Atomic.platform == "MacOSX") {
            cmdKey = (Atomic.input.getKeyDown(Atomic.KEY_LGUI) || Atomic.input.getKeyDown(Atomic.KEY_RGUI));
        } else {
            cmdKey = (Atomic.input.getKeyDown(Atomic.KEY_LCTRL) || Atomic.input.getKeyDown(Atomic.KEY_RCTRL));
        }

        if (cmdKey) {

            if (ev.key == Atomic.KEY_S) {
                this.invokeFileSave();
            }
            else if (ev.key == Atomic.KEY_W) {
                this.invokeFileClose();
            }
            else if (ev.key == Atomic.KEY_I) {
                this.invokeFormatCode();
            }
            else if (ev.key == Atomic.KEY_P) {
                this.invokePlay();
            //if shift is pressed
            } else if (ev.qualifiers & Atomic.QUAL_SHIFT) {
                if (ev.key == Atomic.KEY_B) {
                    EditorUI.getModelOps().showBuildSettings();
                }
            } else if (ev.key == Atomic.KEY_B) {
                EditorUI.getModelOps().showBuild();
            }

        }

    }

}

export = Shortcuts;
