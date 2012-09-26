package plugins;

import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;

public class Model {

    String name;

    String tableName;

    String superClassName;
    
    String packageName;

    boolean isMappedSuperClass = false;

    private Map<String, Member> members;

    public Model(String name) {

        this(name, name);
    }

    public Model(String name, String tableName) {
    	String []nametmp=name.split("[.]");
    	String Pname=nametmp[0];
    	if(nametmp.length>2)
    	{
    		for (int i = 1; i < nametmp.length-1; i++) {
				Pname+="."+nametmp[i];
			}
    	}
        this.name = nametmp[nametmp.length-1];
        this.packageName=Pname;
        this.tableName = tableName;
        this.members = new TreeMap<String, Member>();
        
    }

    public void addMember(String name, Member member) {

        members.put(name, member);
    }

    public Member getMember(String name) {

        return members.get(name);
    }

    public Collection<Member> getMembers() {

        return members.values();
    }

    public void removeMember(String name) {

        members.remove(name);
    }
}
