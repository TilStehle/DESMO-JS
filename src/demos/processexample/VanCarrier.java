package demos.processexample;

import desmoj.core.simulator.*;
import co.paralleluniverse.fibers.SuspendExecution;

/**
 * This class represents a van carrier in the ProcessesExample
 * model. The VC waits until a truck requests its service.
 * It will then fetch the container and load it onto
 * the truck.
 * If there is another truck waiting it starts serving this
 * truck. Otherwise it waits again for the next truck to arrive.
 * @author Olaf Neidhardt, Ruth Meyer
 */
public class VanCarrier extends SimProcess {

	/** a reference to the model this process is a part of
	* useful shortcut to access the model's static components
	*/
	private ProcessesExample myModel;
	/**
	 * Constructor of the van carrier process
	 *
	 * Used to create a new VC to serve trucks.
	 *
	 * @param owner the model this process belongs to
	 * @param name this VC's name
	 * @param showInTrace flag to indicate if this process shall produce output for the trace
	 */
	public VanCarrier(Model owner, String name, boolean showInTrace) {

		super(owner, name, showInTrace);
		// store a reference to the model this VC is associated with
		myModel = (ProcessesExample)owner;
	}
	/**
	 * Describes this van carrier's life cycle.
	 *
	 * It will continually loop through the following steps:
	 * Check if there is a customer waiting.
	 * If there is someone waiting
	 *   a) remove customer from queue
	 *   b) serve customer
	 *   c) return to top
	 * If there is no one waiting
	 *   a) wait (passivate) until someone arrives (who reactivates the VC)
	 *	 b) return to top
	 */
	public void lifeCycle() throws SuspendExecution {

		// the server is always on duty and will never stop working
		while (true) {
			//check if there is someone waiting
			if (myModel.truckQueue.isEmpty()) {

				// NO, there is no one waiting

				// insert yourself into the idle VC queue
				myModel.idleVCQueue.insert(this);
				// and wait for things to happen
				passivate();
			}
			else {

				// YES, there is a customer (truck) waiting

				// get a reference to the first truck from the truck queue
				// (the type cast is necessary because the queue returns SimProcess
				// objects instead of truck objects)
				Truck nextTruck = myModel.truckQueue.first();
				// remove the truck from the queue
				myModel.truckQueue.remove(nextTruck);

				// now serve it (fetch container and load it onto truck)
				// service time is represented by a hold of the VC process
				hold(new TimeSpan(myModel.getServiceTime()));
				// from inside to outside...
				// ...draw a new period of service time
				// ...make a TimeSpan object out of it
				// ...and hold for this amount of time

				// now the truck has received its container and can leave
				// we will reactivate it, to allow it to finish its life cycle
				nextTruck.activate(new TimeSpan(0));
				// the VC can return to top and check for a new customer
			}
		}
	}
} /* end of process class */
