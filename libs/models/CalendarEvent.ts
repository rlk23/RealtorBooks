import mongoose, {Schema, Document} from 'mongoose';

interface ICalendarEvent extends Document {
    title: string;
    start: Date;
    end?: Date;
    userId: string;

}


const CalendarEventSchema = new Schema<ICalendarEvent>({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date},
    userId: {type: String, required: true},
    },{
        timestamps: true,

});

const CalendarEvent = mongoose.models.CalendarEvent || mongoose.model<ICalendarEvent>('CalendarEvent', CalendarEventSchema);

export default CalendarEvent;
