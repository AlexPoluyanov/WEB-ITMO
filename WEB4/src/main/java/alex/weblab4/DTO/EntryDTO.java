package alex.weblab4.DTO;

import lombok.Data;
import lombok.NonNull;

@Data
public class EntryDTO {
    @NonNull
    private double x;

    @NonNull
    private double y;

    @NonNull
    private double r;
}
