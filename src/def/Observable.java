package def;

import java.util.ArrayList;
import java.util.List;

public class Observable {

	private boolean changed;
	private List<Observer> obs;
	
	public Observable() {
		obs = new ArrayList<Observer>();
	}

	public void addObserver(Observer o) {
		obs.add(o);
	}
	
	public void deleteObserver(Observer o) {
		obs.remove(o);
	}
	
	public void notifyObservers() {
		
		if(changed) {
			for (Observer observer : obs) {
				observer.update(this, null);
			}
		}
	}
	
	public void notifyObserversWithArgument(Object arg) {
		
		if(changed) {
			for (Observer observer : obs) {
				observer.update(this, arg);
			}
		}
	}
	
	public void deleteObservers() {
		obs.clear();
	}
	
	protected void setChanged() {
		changed = true;
	}
	
	protected void clearChanged() {
		changed = false;
	}
	
	public boolean hasChanged() {
		return changed;
	}
	
	public int countObservers() {
		return obs.size();
	}
}
