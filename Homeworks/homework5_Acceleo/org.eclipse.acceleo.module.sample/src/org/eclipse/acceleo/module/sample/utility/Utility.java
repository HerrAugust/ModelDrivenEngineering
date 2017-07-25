package org.eclipse.acceleo.module.sample.utility;

import java.util.LinkedList;
import java.util.List;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EClassifier;
import org.eclipse.emf.ecore.EEnum;
import org.eclipse.emf.ecore.EPackage;

public class Utility {
	// Test function
	public Double div (Double a, Double b)
	{
		return a/b;
	}
	// Test function
	public String test(EClass c) {
		return c.getName();
	}
	// Test function
	public List<String> testlist(String a) {
		System.out.println("testlist()");
		List<String> res = new LinkedList<String>();
		res.add("Hello");
		res.add("World");
		res.add(a);
		return res;
	}
	
	
	
	
	/*
	 * Given a package p, it returns all its EClasses.
	 * Note: function written because I get some unexpected results with Acceleo's
	 *  [for(inpck : ecore::EObject | pck.eClassifiers) separator(',')]
		[if(inpck.oclIsTypeOf(ecore::EClass))]
		[inpck.eClass().name/]
		[/if]/]
		[/for] 
	 */
	public List<EClass> getAllClassesInsideEPackage(EPackage p) {
		System.out.println("getAllClassesInsideEPackage");
		List<EClass> classes = new LinkedList<EClass>();
		for(EClassifier e : p.getEClassifiers()) {
			if(e instanceof EClass) {
				classes.add((EClass) e);
			}
		}
		return classes;
	}
	// As getAllClassesInsideEPackage(), but this time for EEnums
	public List<EEnum> getAllEEnumsInsidePackage(EPackage p) {
		System.out.println("getAllEEnumsInsideEPackage");
		List<EEnum> eenums = new LinkedList<EEnum>();
		for(EClassifier e : p.getEClassifiers()) {
			//System.out.println("e: "+e.toString());
			if(e instanceof EEnum) {
				eenums.add((EEnum) e);
			}
		}
		return eenums;
	}
	//Returns the very root package of the model, given one of its packages.
	public EPackage getRootEPackage(EPackage currentpkg) {
		EPackage root = currentpkg;
		while(root.getESuperPackage() != null) {
			root = root.getESuperPackage();
		}
		return root;
	}
	// Returns all packages in the model. pkg is a whichever EPackage of the same model.
	public List<EPackage> getAllPackages(EPackage pkg) {
		System.out.println("getAllPackage()");
		EPackage rootpkg = this.getRootEPackage(pkg);
		List<EPackage> subpkg = this.getAllSubpackages(rootpkg);
		subpkg.add(0,rootpkg);
		return subpkg;
	}
	// Returns all subpackages of pkg in the model. The result is the same of getAllPackages, but this
	// does not include pkg.
	public List<EPackage> getAllSubpackages(EPackage pkg) {
		System.out.println("getAllSubpackage()");
		List<EPackage> subpkg = new LinkedList<EPackage>();
		subpkg.addAll(pkg.getESubpackages());
		for(int i = 0; i < subpkg.size(); i++) {
			subpkg.addAll(subpkg.get(i).getESubpackages());
		}
		return subpkg;
	}
	
}
