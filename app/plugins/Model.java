package plugins;

import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;

import javax.persistence.Transient;

import com.google.gson.annotations.Expose;

import plugins.classes.Attribute;



public class Model {

    int dx; 
    int dy;
    int rot;
    int sx;
    int sy;
    String module;
    String object;
    public class Rect{
    	int x;
    	int y;
    	int width;
    	int height;
    }
    Rect rect=new Rect();
    String label;
    int swimlane1OffsetY;
    boolean shadow;
    public class Attrs{
    	String fill;
    }
    Attrs attrs=new Attrs();
    public class LabelAttrs{
    	String font_4p_weight;
    }
    LabelAttrs labelAttrs=new LabelAttrs();
    String[] methods;
    int labelOffsetX;
    int laberOffsetY;
    
    int swimlane2OffsetY;
    String[] attributes;
    int attributesOffsetX;
    int attributesOffsetY;
    int methodsOffsetX;
    int methodsOffsetY;
    int euid;
    
    
    
    public Model(String name,int len,int id) {
        this.label = name;
        this.methods = new String[len];
        this.attributes=new String[0];
        this.euid=id;
        intializeDefaults();
    }
    public void addMember(String name, Class<?> type,int l) {
    	methods[l]=name+": "+type.getSimpleName();
    } 

    public void intializeDefaults(){
    	this.dx=0; 
        this.dy=0;
        this.rot=0;
        this.sx=1;
        this.sy=1;
        this.swimlane1OffsetY=30;
        this.swimlane2OffsetY=18;
        this.labelOffsetX=20;
        this.laberOffsetY=5;
        this.attributesOffsetX=5;
        this.attributesOffsetY=5;
        this.methodsOffsetX=5;
        this.methodsOffsetY=5;
        this.module="uml";
        this.object="Class";
        
        this.rect.x=100;
        this.rect.y=100;
        this.rect.width=120+this.label.length()*8;
        this.rect.height=60+this.methods.length*20;

        this.attrs.fill="gray";

        this.labelAttrs.font_4p_weight="bold";
    	
    };

    
}
