package demos.processexample;

import desmoj.core.simulator.*;
import co.paralleluniverse.fibers.SuspendExecution;

/**
 * This class represents the truck in the ProcessesExample
 * model.A truck arrives at the container terminal and requests
 * loading of a container. If possible, it is served
 * by the van carrier immediately. Otherwise it waits in the
 * parking area for its turn.
 * After service is completed, it leaves the system.
 *
 * @author Olaf Neidhardt, Ruth Meyer
 */
public class Truck extends SimProcess {

	/** a reference to the model this process is a part of
	* useful shortcut to access the model's static components
	*/
	private ProcessesExample myModel;
	/**
	 * Constructor of the truck process
	 *
	 * Used to create a new truck to be serviced by a van carrier.
	 *
	 * @param owner the model this process belongs to
	 * @param name this truck's name
	 * @param showInTrace flag to indicate if this process shall produce
	 *                    output for the trace
	 */
	public Truck(Model owner, String name, boolean showInTrace) {

		super(owner, name, showInTrace);
		// store a reference to the model this truck is associated with
		myModel = (ProcessesExample)owner;
	}
	/**
	 * Describes this truck's life cycle:
	 *
	 * On arrival, the truck will enter the queue (parking lot).
	 * It will then check if the van carrier is available.
	 * If this is the case, it will activate the van carrier to 
	 * get serviced and transfer the control to the VC.
	 * Otherwise it just passivates (waits).
	 * After service it leaves the system.
	 */
	public void lifeCycle() throws SuspendExecution {

		// enter parking-lot
		myModel.truckQueue.insert(this);
		sendTraceNote("TruckQueuelength: "+ myModel.truckQueue.length());

		// check if a VC is available
		if (!myModel.idleVCQueue.isEmpty()) {
			// yes, it is

			// get a reference to the first VC from the idle VC queue
			// (the type cast is necessary because the queue returns SimProcess
			// objects instead of VC objects)
			VanCarrier vanCarrier = myModel.idleVCQueue.first();
			// remove the van carrier from the queue
			myModel.idleVCQueue.remove(vanCarrier);

			//place the VC on the eventlist right after me,
			//to ensure that I will be the next customer to get serviced
			vanCarrier.activateAfter(this);
		}

		// wait for service
		passivate();

		// Ok, I am back online again, which means I was serviced
		// by the VC. I can leave the systems now.
		// Luckily I don't have to do anything more than sending
		// a message to the trace file, because the
		// Java VM garbage collector will get the job done.
		// Bye!
		sendTraceNote("Truck was serviced and leaves system.");
	}
} /* end of process class */
