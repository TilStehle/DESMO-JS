var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
var desmoj;
(function (desmoj) {
    var core;
    (function (core) {
        var simulator;
        (function (simulator) {
            /**
             * Alternative Implementation of the interface <code>EventList</code> using a
             * tree-based list as a container for the event-notes, yielding both access and
             * removal of event-list entries in O(log n) time.
             *
             * Disadvantages compared to <code>EventVector</code> include
             * non-thread-safeness (however, discrete Event simulation should never attempt
             * concurrent modifications of the event-list) and the slightly higher memory
             * requirement.
             *
             * The internal tree-based list is provided by the class
             * <code>org.apache.commons.collections.list.TreeList</code> from the Commons
             * Collections package from the Apache Jakarta Commons Project (see
             * http://jakarta.apache.org/commons/index.html). Thus, his product includes
             * software developed by The Apache Software Foundation
             * (http://www.apache.org/). For License see
             * http://www.apache.org/licenses/LICENSE-2.0 (of which a copy can be found in
             * the root directory of this distribtuon).
             *
             * @see org.apache.commons.collections.list.TreeList
             * @see EventVectorList
             * @see EventNote
             *
             * @version DESMO-J, Ver. 2.5.1e copyright (c) 2017
             * @author Tim Lechler, Ruth Meyer, modified by Johannes Göbel
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License. You
             * may obtain a copy of the License at
             * http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS"
             * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
             * or implied. See the License for the specific language governing
             * permissions and limitations under the License.
             * @extends desmoj.core.simulator.EventList
             * @class
             */
            var EventTreeList = (function (_super) {
                __extends(EventTreeList, _super);
                function EventTreeList() {
                    var _this = _super.call(this) || this;
                    _this.eTreeList = null;
                    _this.eTreeList = ([]);
                    return _this;
                }
                /**
                 * Returns the first event-note in the event-list. It is the event-note with
                 * the lowest (nearest) associated point of simulation time of all
                 * Event notes contained in the evnet-list. Note that the event-note is not
                 * removed from the event-list.
                 *
                 * @return {desmoj.core.simulator.EventNote} EventNote : the event-note to be processed next in the order of
                 * time. Returns <code>null</code> if the event-list is empty.
                 */
                EventTreeList.prototype.firstNote = function () {
                    if (this.isEmpty())
                        return null;
                    else
                        return this.eTreeList[0];
                };
                /**
                 * Inserts the new event-note preserving the temporal order of the event-notes
                 * contained in the event-list. It uses binary search to determine the
                 * position where to insert the new event-note to increase performance.
                 *
                 * @param {desmoj.core.simulator.EventNote} newNote
                 * EventNote : the new note to be inserted in the event-list
                 * keeping the temporal order
                 */
                EventTreeList.prototype.insert = function (newNote) {
                    var who1 = newNote.getEntity1();
                    if (who1 != null) {
                        who1.addEventNote(newNote);
                    }
                    var who2 = newNote.getEntity2();
                    if (who2 != null) {
                        who2.addEventNote(newNote);
                    }
                    var who3 = newNote.getEntity3();
                    if (who3 != null) {
                        who3.addEventNote(newNote);
                    }
                    var Event = newNote.getEvent();
                    if (Event != null) {
                        Event.addEventNote(newNote);
                    }
                    if (this.isEmpty()) {
                        /* add */ (this.eTreeList.push(newNote) > 0);
                        return;
                    }
                    else {
                        var left = 0;
                        var right = this.eTreeList.length - 1;
                        var index = 0;
                        var refTime = newNote.getTime();
                        var refPrio = newNote.getPriority();
                        do {
                            index = ((left + right) / 2 | 0);
                            if (desmoj.core.simulator.TimeInstant.isBefore(this.eTreeList[index].getTime(), refTime) || (desmoj.core.simulator.TimeInstant.isEqual(this.eTreeList[index].getTime(), refTime) && this.eTreeList[index].getPriority() >= refPrio)) {
                                if (index < (this.eTreeList.length - 1)) {
                                    if (desmoj.core.simulator.TimeInstant.isAfter(this.eTreeList[index + 1].getTime(), refTime) || (desmoj.core.simulator.TimeInstant.isEqual(this.eTreeList[index + 1].getTime(), refTime) && this.eTreeList[index].getPriority() < refPrio)) {
                                        /* add */ this.eTreeList.splice(index + 1, 0, newNote);
                                        return;
                                    }
                                    else {
                                        left = index + 1;
                                    }
                                }
                                else {
                                    /* add */ (this.eTreeList.push(newNote) > 0);
                                    return;
                                }
                            }
                            else {
                                if (index > 0) {
                                    if (desmoj.core.simulator.TimeInstant.isBefore(this.eTreeList[index - 1].getTime(), refTime) || (desmoj.core.simulator.TimeInstant.isEqual(this.eTreeList[index - 1].getTime(), refTime) && this.eTreeList[index - 1].getPriority() >= refPrio)) {
                                        /* add */ this.eTreeList.splice(index, 0, newNote);
                                        return;
                                    }
                                    else {
                                        right = index - 1;
                                    }
                                }
                                else {
                                    /* add */ this.eTreeList.splice(0, 0, newNote);
                                    return;
                                }
                            }
                        } while (((left <= right)));
                        /* add */ (this.eTreeList.push(newNote) > 0);
                    }
                };
                /**
                 * Inserts a new event-note after another EventNote specified. Note that to
                 * keep the temporal order of the event-list, the scheduled time will be set
                 * to the same time as the referred "afterNote". Note also, that afterNote
                 * must be contained in the event-list. If the referred "where" is not
                 * contained in the event-list, there is no chance to determine the time
                 * that the new note is intended to be scheduled at. Thus the new event-note
                 * will not be inserted and a <code>EventNotScheduledException</code> will
                 * be thrown, stopping the simulation.
                 *
                 * @param {desmoj.core.simulator.EventNote} where
                 * EventNote : The event-note containing the event after which the
                 * new note is supposed to be inserted into the event-list.
                 * @param {desmoj.core.simulator.EventNote} newNote
                 * EventNote : The new event-note to be inserted after the
                 * specified EventNote in the event-list.
                 * @throws SimAbortedException
                 * : if referred EventNote is not contained in the event-list
                 */
                EventTreeList.prototype.insertAfter = function (where, newNote) {
                    var who1 = newNote.getEntity1();
                    if (who1 != null) {
                        who1.addEventNote(newNote);
                    }
                    var who2 = newNote.getEntity2();
                    if (who2 != null) {
                        who2.addEventNote(newNote);
                    }
                    var who3 = newNote.getEntity3();
                    if (who3 != null) {
                        who3.addEventNote(newNote);
                    }
                    var Event = newNote.getEvent();
                    if (Event != null) {
                        Event.addEventNote(newNote);
                    }
                    var i = this.eTreeList.indexOf(where);
                    if (i < 0) {
                        var mBuffer = null;
                        if (newNote.getEntity1() != null) {
                            mBuffer = newNote.getEntity1().getModel();
                        }
                        if (newNote.getEvent() != null) {
                            mBuffer = newNote.getEvent().getModel();
                        }
                        throw new desmoj.core.exception.SimAbortedException(new desmoj.core.report.ErrorMessage(mBuffer, "Can not insert new event-note after given EventNote! Simulation aborted", "Internal DESMO-J class : EventTreeList Method : insertAfter(EventNote where, EventNote newNote)", "The event-note to insert the new note after is not contained in the event tree list.", "This is a fatal error. Contact DESMOJ support", newNote.getTime()));
                    }
                    else {
                        newNote.setTime(where.getTime());
                        /* add */ this.eTreeList.splice(i + 1, 0, newNote);
                    }
                };
                /**
                 * Inserts the given EventNote at the first position in the event-list. The
                 * Event encapsulated in that EventNote will probably be the next event to
                 * be processed by the scheduler (unless some other calls to this method are
                 * made before). Note that for consistency the time of the new event-note
                 * is set to the time of the next entry, if the time of the next entry is earlier.
                 *
                 * @param {desmoj.core.simulator.EventNote} newNote
                 * EventNote : The event-note to be inserted at the first position
                 * in the event-list.
                 */
                EventTreeList.prototype.insertAsFirst = function (newNote) {
                    if (!this.isEmpty()) {
                        var next = this.eTreeList[0].getTime();
                        if (desmoj.core.simulator.TimeInstant.isBefore(next, newNote.getTime())) {
                            newNote.setTime(next);
                        }
                    }
                    /* add */ this.eTreeList.splice(0, 0, newNote);
                    var who1 = newNote.getEntity1();
                    if (who1 != null) {
                        who1.addEventNote(newNote);
                    }
                    var who2 = newNote.getEntity2();
                    if (who2 != null) {
                        who2.addEventNote(newNote);
                    }
                    var who3 = newNote.getEntity3();
                    if (who3 != null) {
                        who3.addEventNote(newNote);
                    }
                    var Event = newNote.getEvent();
                    if (Event != null) {
                        Event.addEventNote(newNote);
                    }
                };
                /**
                 * Inserts a new event-note before another EventNote specified. Note that
                 * this could disturb the temporal order of the event-list. So this method
                 * should only be used carefully. Note also, that EventNote 'where' must be
                 * contained in the event-list or otherwise an exception will be thrown.
                 *
                 * @param {desmoj.core.simulator.EventNote} where
                 * EventNote : The event-note containing the event before which
                 * the newNote is supposed to be inserted into the event-list.
                 * @param {desmoj.core.simulator.EventNote} newNote
                 * EventNote : The new event-note to be inserted before the
                 * specified EventNote in the event-list
                 * @throws SimAbortedException
                 * : if referred EventNote is not contained in the event-list
                 */
                EventTreeList.prototype.insertBefore = function (where, newNote) {
                    var who1 = newNote.getEntity1();
                    if (who1 != null) {
                        who1.addEventNote(newNote);
                    }
                    var who2 = newNote.getEntity2();
                    if (who2 != null) {
                        who2.addEventNote(newNote);
                    }
                    var who3 = newNote.getEntity3();
                    if (who3 != null) {
                        who3.addEventNote(newNote);
                    }
                    var Event = newNote.getEvent();
                    if (Event != null) {
                        Event.addEventNote(newNote);
                    }
                    var i = this.eTreeList.indexOf(where);
                    if (i < 0) {
                        var mBuffer = null;
                        if (newNote.getEntity1() != null) {
                            mBuffer = newNote.getEntity1().getModel();
                        }
                        if (newNote.getEvent() != null) {
                            mBuffer = newNote.getEvent().getModel();
                        }
                        throw new desmoj.core.exception.SimAbortedException(new desmoj.core.report.ErrorMessage(mBuffer, "Can not insert new event-note before given EventNote! Simulation aborted", "Internal DESMO-J class : EventTreeList Method : insertBefore(EventNote where, EventNote newNote)", "The event-note to insert the new note before is not contained in the event tree list.", "This is a fatal error. Contact DESMOJ support", newNote.getTime()));
                    }
                    else {
                        newNote.setTime(where.getTime());
                        /* add */ this.eTreeList.splice(i, 0, newNote);
                    }
                };
                /**
                 * Tests if there are any scheduled events contained in the event-list. If
                 * the event-list happens to be empty during the run of a simulation, this
                 * is a criterium to stop the simulation, since no further action is
                 * scheduled.
                 *
                 * @return {boolean} boolean : True if there are no Event notes contained in the
                 * event-list, false otherwise.
                 */
                EventTreeList.prototype.isEmpty = function () {
                    return (this.eTreeList.length == 0);
                };
                /**
                 * Returns the last EventNote in the event-list. If the event-list is empty,
                 * <code>null</code> will be returned.
                 *
                 * @return {desmoj.core.simulator.EventNote} EventNote : the last EventNote in the event-list, null if the
                 * event-list is empty
                 */
                EventTreeList.prototype.lastNote = function () {
                    if (this.isEmpty())
                        return null;
                    else
                        return this.eTreeList[this.eTreeList.length - 1];
                };
                /**
                 * Returns the next event-note in the event-list relative to the given
                 * EventNote. If the given EventNote is not contained in the event-list or
                 * happens to be the last EventNote in the event-list, null will be
                 * returned.
                 *
                 * @return {desmoj.core.simulator.EventNote} EventNote : The event-note following the given EventNote or
                 * <ocde>null</code> if the given EventNote was last or not found
                 * @param {desmoj.core.simulator.EventNote} origin
                 * EventNote : The event-note whose successor is wanted
                 */
                EventTreeList.prototype.nextNote = function (origin) {
                    if ((this.eTreeList.indexOf((origin)) >= 0)) {
                        if (origin === this.eTreeList[this.eTreeList.length - 1]) {
                            return null;
                        }
                        else
                            return this.eTreeList[this.eTreeList.indexOf(origin) + 1];
                    }
                    return null;
                };
                /**
                 * Returns the previous EventNote in the event-list relative to the given
                 * EventNote. If the given EventNote is not contained in the event-list or
                 * happens to be the first event-note in the event-list, null will be
                 * returned.
                 *
                 * @return {desmoj.core.simulator.EventNote} EventNote : The event-note following the given EventNote or
                 * <ocde>null</code> if the given EventNote was first or not found
                 * @param {desmoj.core.simulator.EventNote} origin
                 * EventNote : The event-note whose predecessor is wanted
                 */
                EventTreeList.prototype.prevNote = function (origin) {
                    if ((this.eTreeList.indexOf((origin)) >= 0)) {
                        if (origin === this.eTreeList[0]) {
                            return null;
                        }
                        return this.eTreeList[this.eTreeList.indexOf(origin) - 1];
                    }
                    return null;
                };
                /**
                 * Removes the given EventNote from the event-list.
                 *
                 * Warning: Make sure to tell the entity of the event-note to delete
                 * the Note from its List as well.
                 *
                 * Warning: Make sure to tell the entity of the event-note to delete
                 * the Note from its List as well.
                 *
                 * @param {desmoj.core.simulator.EventNote} note
                 * EventNote : The event-note to be removed from the event-list
                 */
                EventTreeList.prototype.remove = function (note) {
                    var pos = this.eTreeList.indexOf(note);
                    if (pos === -1)
                        return;
                    else {
                        /* remove */ this.eTreeList.splice(pos, 1);
                        if (note.getEntity1() != null) {
                            note.getEntity1().removeEventNote(note);
                        }
                        if (note.getEntity2() != null) {
                            note.getEntity2().removeEventNote(note);
                        }
                        if (note.getEntity3() != null) {
                            note.getEntity3().removeEventNote(note);
                        }
                        if (note.getEvent() != null) {
                            note.getEvent().removeEventNote(note);
                        }
                    }
                };
                /**
                 * Removes the first event-note from the event-list. Does nothing if the
                 * event-list is already empty.
                 * @return {desmoj.core.simulator.EventNote}
                 */
                EventTreeList.prototype.removeFirst = function () {
                    if (!(this.eTreeList.length == 0)) {
                        var noteObject = this.eTreeList.splice(0, 1);
                        var note = noteObject[0];
                        if (note.getEntity1() != null) {
                            note.getEntity1().removeEventNote(note);
                        }
                        if (note.getEntity2() != null) {
                            note.getEntity2().removeEventNote(note);
                        }
                        if (note.getEntity3() != null) {
                            note.getEntity3().removeEventNote(note);
                        }
                        if (note.getEvent() != null) {
                            note.getEvent().removeEventNote(note);
                        }
                        return note;
                    }
                    return null;
                };
                /**
                 * Returns a string representing the entries of this tree list in a row. The
                 * resulting string includes all Event notes in ascending order as they are
                 * placed inside the event tree list.
                 * @return {string}
                 */
                EventTreeList.prototype.toString = function () {
                    var textBuffer = { str: "", toString: function () { return this.str; } };
                    var notes = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(this.eTreeList);
                    while ((notes.hasNext())) {
                        /* append */ (function (sb) { return sb.str = sb.str.concat("["); })(textBuffer);
                        /* append */ (function (sb) { return sb.str = sb.str.concat(notes.next()); })(textBuffer);
                        /* append */ (function (sb) { return sb.str = sb.str.concat("]"); })(textBuffer);
                    }
                    ;
                    return textBuffer.str;
                };
                /**
                 * Returns if the event-list processes concurrent Events in random order or
                 * not.
                 *
                 * @return {boolean} boolean: <code>false</code> since no randomization
                 */
                EventTreeList.prototype.isRandomizingConcurrentEvents = function () {
                    return false;
                };
                return EventTreeList;
            }(desmoj.core.simulator.EventList));
            simulator.EventTreeList = EventTreeList;
            EventTreeList["__class"] = "desmoj.core.simulator.EventTreeList";
        })(simulator = core.simulator || (core.simulator = {}));
    })(core = desmoj.core || (desmoj.core = {}));
})(desmoj || (desmoj = {}));
